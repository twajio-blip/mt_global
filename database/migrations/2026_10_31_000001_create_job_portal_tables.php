<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Countries Setup
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('code', 5)->nullable();
            $table->string('flag_emoji', 20)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Designations Setup
        Schema::create('designations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('category', 100)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Jobs Engine Table
        Schema::create('portal_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_bn')->nullable();
            $table->string('prefix', 15);
            $table->unsignedInteger('serial_number');
            $table->string('job_code', 30)->unique();
            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
            $table->foreignId('designation_id')->constrained('designations')->cascadeOnDelete();
            $table->string('employer_name');
            $table->string('location')->nullable();
            $table->unsignedInteger('vacancy')->nullable();
            $table->string('salary')->nullable();
            $table->string('contract_duration')->nullable();
            $table->string('working_hours')->nullable();
            
            // Interview Information
            $table->date('interview_date')->nullable();
            $table->string('interview_type')->default('To be announced'); // To be announced, Delegation Interview, Online Interview, CV Selection / Pushing
            $table->string('interview_venue')->nullable();

            // Job Requirements
            $table->string('req_experience')->nullable();
            $table->string('req_education')->nullable();
            $table->string('req_age')->nullable();
            $table->string('req_gender')->default('Not applicable'); // Not applicable, Male, Female, Male / Female

            // Job Content (Multilingual)
            $table->text('desc_en')->nullable();
            $table->text('desc_bn')->nullable();
            $table->text('req_candidate_en')->nullable();
            $table->text('req_candidate_bn')->nullable();
            $table->text('responsibilities_en')->nullable();
            $table->text('responsibilities_bn')->nullable();
            $table->text('additional_info_en')->nullable();
            $table->text('additional_info_bn')->nullable();

            // Benefits / Facilities (JSON toggle booleans)
            $table->json('benefits')->nullable();

            // Visa Information
            $table->string('visa_fee_type')->default('Visa Fee'); // Visa Fee, Visa Fee (All Costs Included)
            $table->string('visa_type')->nullable();
            $table->text('visa_notes_en')->nullable();
            $table->text('visa_notes_bn')->nullable();

            // Application
            $table->date('application_deadline')->nullable();
            $table->string('status')->default('Draft'); // Draft, Published, Inactive

            $table->timestamps();
        });

        // 4. Job Applications Table (The Quick Apply - Event / Pivot)
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('portal_jobs')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('full_name');
            $table->string('passport_number');
            $table->string('mobile_number');
            $table->string('experience_years');
            $table->boolean('has_overseas_experience')->default(false);
            $table->string('current_location');

            // 3 Uploaded Files
            $table->string('cv_file_path');
            $table->string('cv_file_name')->nullable();
            $table->string('passport_file_path');
            $table->string('passport_file_name')->nullable();
            $table->string('photo_file_path');
            $table->string('photo_file_name')->nullable();

            $table->string('status')->default('Pending'); // Pending, Selected, Rejected
            $table->timestamps();
        });

        // 5. CV Profiles Table (The Detailed Builder - User Master)
        Schema::create('cv_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Personal Information
            $table->string('photo_path')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->date('dob')->nullable();
            $table->string('pob')->nullable();
            $table->string('nationality')->default('Bangladeshi');
            $table->string('gender')->nullable(); // Male, Female
            $table->string('marital_status')->nullable(); // Single, Married
            $table->string('religion')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();

            // Passport Information
            $table->date('passport_expiry')->nullable();
            $table->string('passport_issue_place')->nullable();

            // Address
            $table->string('village_area')->nullable();
            $table->string('post_office')->nullable();
            $table->string('police_station')->nullable();
            $table->string('district')->nullable();
            $table->string('country')->default('Bangladesh');
            $table->string('email')->nullable();

            // Languages (JSON array: ["Bangla", "English", "Arabic"])
            $table->json('languages')->nullable();

            $table->timestamps();
        });

        // 6. CV Academic Qualifications (Dynamic 1-to-many list)
        Schema::create('cv_academic_qualifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_profile_id')->constrained('cv_profiles')->cascadeOnDelete();
            $table->string('degree');
            $table->string('institution');
            $table->string('passing_year');
            $table->string('result_grade')->nullable();
            $table->timestamps();
        });

        // 7. CV Work Experiences (Dynamic 1-to-many list)
        Schema::create('cv_work_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_profile_id')->constrained('cv_profiles')->cascadeOnDelete();
            $table->string('job_title');
            $table->string('company');
            $table->string('country')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('is_current')->default(false);
            $table->timestamps();
        });

        // 8. CV Trainings (Dynamic 1-to-many list)
        Schema::create('cv_trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cv_profile_id')->constrained('cv_profiles')->cascadeOnDelete();
            $table->string('course_name');
            $table->string('institute');
            $table->string('duration');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_trainings');
        Schema::dropIfExists('cv_work_experiences');
        Schema::dropIfExists('cv_academic_qualifications');
        Schema::dropIfExists('cv_profiles');
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('portal_jobs');
        Schema::dropIfExists('designations');
        Schema::dropIfExists('countries');
    }
};

