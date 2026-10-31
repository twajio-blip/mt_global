<?php

namespace Tests\Feature;

use App\Models\Country;
use App\Models\CvProfile;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PortalSystemTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_dashboard_page_renders_with_stats_and_recent_data(): void
    {
        $response = $this->get('/portal/dashboard');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Portal/Dashboard')
                ->has('stats')
                ->has('recentApplications')
                ->has('recentJobs')
        );
    }

    public function test_public_jobs_page_renders_successfully(): void
    {
        $response = $this->get('/jobs');
        $response->assertStatus(200);
    }

    public function test_portal_applications_table_renders_successfully(): void
    {
        $response = $this->get('/portal/applications');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Portal/Applications/Index')
                ->has('applications')
                ->has('cvProfiles')
                ->has('allJobs')
        );
    }

    public function test_job_creation_page_and_sequential_prefix_code(): void
    {
        $country = Country::first();
        $designation = Designation::first();

        $response = $this->post('/portal/jobs', [
            'title_en' => 'Senior Site Inspector',
            'prefix' => 'QA-INSP',
            'country_id' => $country->id,
            'designation_id' => $designation->id,
            'employer_name' => 'Gulf Quality Assurance JV',
            'salary' => 'QAR 3,500',
            'interview_type' => 'Online Interview',
            'req_gender' => 'Male',
            'visa_fee_type' => 'Visa Fee (All Costs Included)',
            'status' => 'Published',
        ]);

        $response->assertRedirect('/portal/jobs');
        
        $job = Job::where('title_en', 'Senior Site Inspector')->first();
        $this->assertNotNull($job);
        $this->assertStringStartsWith('QA-INSP-', $job->job_code);
        $this->assertGreaterThan(0, $job->serial_number);
    }

    public function test_cv_profile_editor_loads_with_auto_filled_core_user(): void
    {
        $cv = CvProfile::first();
        $this->assertNotNull($cv);

        $response = $this->get("/portal/cvs/{$cv->id}/edit");
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('Portal/Applications/CvEditor')
                ->where('cvProfile.user_name', $cv->user->name)
                ->where('cvProfile.user_passport', $cv->user->passport_number)
                ->where('cvProfile.user_phone', $cv->user->phone)
        );
    }

    public function test_quick_apply_stores_3_files_and_creates_application(): void
    {
        Storage::fake('public');

        $job = Job::first();

        $cvFile = UploadedFile::fake()->create('candidate_cv.pdf', 200, 'application/pdf');
        $passportFile = UploadedFile::fake()->create('passport_scan.jpg', 300, 'image/jpeg');
        $photoFile = UploadedFile::fake()->create('photo.jpg', 150, 'image/jpeg');

        $response = $this->post("/jobs/{$job->id}/apply", [
            'full_name' => 'Tariqul Islam',
            'passport_number' => 'B09988776',
            'mobile_number' => '+880 1711-223344',
            'experience_years' => '6 years',
            'has_overseas_experience' => true,
            'current_location' => 'Sylhet, Bangladesh',
            'cv_file' => $cvFile,
            'passport_file' => $passportFile,
            'photo_file' => $photoFile,
        ]);

        $response->assertSessionHas('success_application');

        $app = JobApplication::where('passport_number', 'B09988776')->first();
        $this->assertNotNull($app);
        $this->assertEquals('Tariqul Islam', $app->full_name);
        $this->assertTrue($app->has_overseas_experience);
        $this->assertNotNull($app->cv_file_path);
        $this->assertNotNull($app->passport_file_path);
        $this->assertNotNull($app->photo_file_path);
    }
}
