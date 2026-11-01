<?php

namespace Tests\Feature;

use App\Models\Country;
use App\Models\Designation;
use App\Models\Job;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BilingualSystemTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'admin']);
    }

    public function test_country_can_be_stored_with_english_and_bangla_names(): void
    {
        $response = $this->actingAs($this->admin)->post('/portal/setup/countries', [
            'name' => 'Saudi Arabia',
            'name_bn' => 'সৌদি আরব',
            'code' => 'SA',
            'flag_emoji' => '🇸🇦',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('countries', [
            'name' => 'Saudi Arabia',
            'name_bn' => 'সৌদি আরব',
            'code' => 'SA',
        ]);
    }

    public function test_country_can_be_updated(): void
    {
        $country = Country::create([
            'name' => 'Saudi Arabia',
            'name_bn' => 'সৌদি আরব',
            'code' => 'SA',
        ]);

        $response = $this->actingAs($this->admin)->put("/portal/setup/countries/{$country->id}", [
            'name' => 'Kingdom of Saudi Arabia',
            'name_bn' => 'সৌদি আরব রাজ্য',
            'code' => 'SA',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('countries', [
            'id' => $country->id,
            'name' => 'Kingdom of Saudi Arabia',
            'name_bn' => 'সৌদি আরব রাজ্য',
            'code' => 'SA',
        ]);
    }

    public function test_designation_can_be_stored_without_category_and_with_bangla(): void
    {
        $response = $this->actingAs($this->admin)->post('/portal/setup/designations', [
            'name' => 'Electrical Technician',
            'name_bn' => 'ইলেকট্রিক্যাল টেকনিশিয়ান',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('designations', [
            'name' => 'Electrical Technician',
            'name_bn' => 'ইলেকট্রিক্যাল টেকনিশিয়ান',
        ]);
    }

    public function test_designation_can_be_updated(): void
    {
        $designation = Designation::create([
            'name' => 'Driver',
            'name_bn' => 'ড্রাইভার',
        ]);

        $response = $this->actingAs($this->admin)->put("/portal/setup/designations/{$designation->id}", [
            'name' => 'Professional Heavy Driver',
            'name_bn' => 'পেশাদার ভারী চালক',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('designations', [
            'id' => $designation->id,
            'name' => 'Professional Heavy Driver',
            'name_bn' => 'পেশাদার ভারী চালক',
        ]);
    }

    public function test_job_can_be_created_with_full_bilingual_fields(): void
    {
        $country = Country::create(['name' => 'UAE', 'name_bn' => 'সংযুক্ত আরব আমিরাত']);
        $designation = Designation::create(['name' => 'Driver', 'name_bn' => 'ড্রাইভার']);

        $response = $this->actingAs($this->admin)->post('/portal/jobs', [
            'title_en' => 'Heavy Driver',
            'title_bn' => 'ভারী চালক',
            'prefix' => 'DXB',
            'country_id' => $country->id,
            'designation_id' => $designation->id,
            'employer_name' => 'Dubai Logistics Co.',
            'employer_name_bn' => 'দুবাই লজিস্টিকস কোং',
            'location' => 'Dubai',
            'location_bn' => 'দুবাই',
            'vacancy' => 10,
            'salary' => 'AED 2,500 / month',
            'salary_bn' => '২,৫০০ দিরহাম / মাস',
            'contract_duration' => '2 years',
            'contract_duration_bn' => '২ বছর',
            'working_hours' => '8 hours/day',
            'working_hours_bn' => '৮ ঘণ্টা/দিন',
            'interview_type' => 'Online Interview',
            'req_gender' => 'Male',
            'visa_fee_type' => 'Visa Fee (All Costs Included)',
            'status' => 'Published',
        ]);

        $response->assertRedirect(route('portal.jobs.index'));
        $this->assertDatabaseHas('portal_jobs', [
            'title_en' => 'Heavy Driver',
            'title_bn' => 'ভারী চালক',
            'employer_name' => 'Dubai Logistics Co.',
            'employer_name_bn' => 'দুবাই লজিস্টিকস কোং',
            'salary_bn' => '২,৫০০ দিরহাম / মাস',
            'job_code' => 'DXB-0001',
        ]);
    }
}

