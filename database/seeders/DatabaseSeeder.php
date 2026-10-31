<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\CvAcademicQualification;
use App\Models\CvProfile;
use App\Models\CvTraining;
use App\Models\CvWorkExperience;
use App\Models\Designation;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@jobportal.com'],
            [
                'name' => 'Portal Administrator',
                'phone' => '+880 1700-000000',
                'passport_number' => 'ADM999999',
                'role' => 'admin',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Candidate Users
        $candidatesData = [
            ['name' => 'Md. Rahim Uddin', 'email' => 'rahim.uddin@gmail.com', 'phone' => '+880 1811-204576', 'passport' => 'A08812345'],
            ['name' => 'Suresh Thapa', 'email' => 'suresh.thapa88@gmail.com', 'phone' => '+977 980-1234567', 'passport' => 'N90182744'],
            ['name' => 'Arif Hossain', 'email' => 'arif.h.elec@yahoo.com', 'phone' => '+880 1715-889012', 'passport' => 'B01928374'],
            ['name' => 'Maria Santos', 'email' => 'maria.santos@gmail.com', 'phone' => '+63 917-555-0142', 'passport' => 'P58473921'],
            ['name' => 'Kamal Hossen', 'email' => 'kamalhossen.bd@gmail.com', 'phone' => '+880 1923-410087', 'passport' => 'A09182736'],
            ['name' => 'Rajesh Kumar', 'email' => 'rajesh.welder@gmail.com', 'phone' => '+91 98470-22119', 'passport' => 'Z94827104'],
            ['name' => 'Nusrat Jahan', 'email' => 'nusrat.jahan21@gmail.com', 'phone' => '+880 1612-778340', 'passport' => 'B09482019'],
            ['name' => 'Imran Khan', 'email' => 'imrankhan.driver@gmail.com', 'phone' => '+92 300-4567812', 'passport' => 'K83920192'],
            ['name' => 'Sabbir Ahmed', 'email' => 'sabbir.ac.tech@gmail.com', 'phone' => '+880 1740-332198', 'passport' => 'A03948102'],
            ['name' => 'Emmanuel Owusu', 'email' => 'e.owusu@gmail.com', 'phone' => '+233 24-555-0198', 'passport' => 'G49201948'],
            ['name' => 'Bikash Rai', 'email' => 'bikashrai.np@gmail.com', 'phone' => '+977 984-5566778', 'passport' => 'N02948192'],
            ['name' => 'Tanvir Alam', 'email' => 'tanvir.alam.civil@gmail.com', 'phone' => '+880 1819-552044', 'passport' => 'B08291048'],
            ['name' => 'Anil Sharma', 'email' => 'anil.sharma.drv@gmail.com', 'phone' => '+91 99100-45231', 'passport' => 'Z83920183'],
        ];

        $users = [];
        foreach ($candidatesData as $c) {
            $users[] = User::firstOrCreate(
                ['email' => $c['email']],
                [
                    'name' => $c['name'],
                    'phone' => $c['phone'],
                    'passport_number' => $c['passport'],
                    'role' => 'candidate',
                    'password' => Hash::make('password'),
                ]
            );
        }

        // 3. Countries Setup
        $countriesList = [
            ['name' => 'Saudi Arabia', 'name_bn' => 'সৌদি আরব', 'code' => 'SA', 'flag_emoji' => '🇸🇦'],
            ['name' => 'UAE', 'name_bn' => 'সংযুক্ত আরব আমিরাত', 'code' => 'AE', 'flag_emoji' => '🇦🇪'],
            ['name' => 'Qatar', 'name_bn' => 'কাতার', 'code' => 'QA', 'flag_emoji' => '🇶🇦'],
            ['name' => 'Kuwait', 'name_bn' => 'কুয়েত', 'code' => 'KW', 'flag_emoji' => '🇰🇼'],
            ['name' => 'Oman', 'name_bn' => 'ওমান', 'code' => 'OM', 'flag_emoji' => '🇴🇲'],
            ['name' => 'Bahrain', 'name_bn' => 'বাহরাইন', 'code' => 'BH', 'flag_emoji' => '🇧🇭'],
            ['name' => 'Malaysia', 'name_bn' => 'মালয়েশিয়া', 'code' => 'MY', 'flag_emoji' => '🇲🇾'],
            ['name' => 'Singapore', 'name_bn' => 'সিঙ্গাপুর', 'code' => 'SG', 'flag_emoji' => '🇸🇬'],
            ['name' => 'Romania', 'name_bn' => 'রোমানিয়া', 'code' => 'RO', 'flag_emoji' => '🇷🇴'],
            ['name' => 'Croatia', 'name_bn' => 'ক্রোয়েশিয়া', 'code' => 'HR', 'flag_emoji' => '🇭🇷'],
            ['name' => 'Poland', 'name_bn' => 'পোল্যান্ড', 'code' => 'PL', 'flag_emoji' => '🇵🇱'],
            ['name' => 'Jordan', 'name_bn' => 'জর্ডান', 'code' => 'JO', 'flag_emoji' => '🇯🇴'],
            ['name' => 'Maldives', 'name_bn' => 'মালদ্বীপ', 'code' => 'MV', 'flag_emoji' => '🇲🇻'],
            ['name' => 'India', 'name_bn' => 'ভারত', 'code' => 'IN', 'flag_emoji' => '🇮🇳'],
            ['name' => 'Bangladesh', 'name_bn' => 'বাংলাদেশ', 'code' => 'BD', 'flag_emoji' => '🇧🇩'],
        ];

        $countryMap = [];
        foreach ($countriesList as $item) {
            $country = Country::firstOrCreate(['name' => $item['name']], $item);
            $country->update(['name_bn' => $item['name_bn']]);
            $countryMap[$item['name']] = $country->id;
        }

        // 4. Designations Setup (Category removed)
        $designationsList = [
            ['name' => 'Electrical Technician', 'name_bn' => 'ইলেকট্রিক্যাল টেকনিশিয়ান'],
            ['name' => 'Heavy Vehicle Driver', 'name_bn' => 'ভারী যানবাহন চালক'],
            ['name' => 'General Construction Worker', 'name_bn' => 'সাধারণ নির্মাণ শ্রমিক'],
            ['name' => 'Hotel Staff', 'name_bn' => 'হোটেল স্টাফ'],
            ['name' => 'Welder', 'name_bn' => 'ওয়েল্ডার'],
            ['name' => 'Factory Worker', 'name_bn' => 'কারখানা শ্রমিক'],
            ['name' => 'AC Technician', 'name_bn' => 'এসি টেকনিশিয়ান'],
            ['name' => 'Commis Chef', 'name_bn' => 'সহকারী শেফ'],
            ['name' => 'Security Guard', 'name_bn' => 'নিরাপত্তা প্রহরী'],
            ['name' => 'Supervisor', 'name_bn' => 'তত্ত্বাবধায়ক / সুপারভাইজার'],
            ['name' => 'Mason', 'name_bn' => 'রাজমিস্ত্রি'],
            ['name' => 'Cleaner', 'name_bn' => 'পরিচ্ছন্নতাকর্মী'],
            ['name' => 'Accountant', 'name_bn' => 'হিসাবরক্ষক'],
            ['name' => 'Driver', 'name_bn' => 'ড্রাইভার'],
        ];

        $designationMap = [];
        foreach ($designationsList as $item) {
            $designation = Designation::firstOrCreate(['name' => $item['name']], $item);
            $designation->update(['name_bn' => $item['name_bn']]);
            $designationMap[$item['name']] = $designation->id;
        }

        // 5. Jobs Data
        $jobsData = [
            [
                'title_en' => 'Electrical Technician',
                'title_bn' => 'ইলেকট্রিক্যাল টেকনিশিয়ান',
                'prefix' => 'SA-ET',
                'country_id' => $countryMap['Saudi Arabia'],
                'designation_id' => $designationMap['Electrical Technician'],
                'employer_name' => 'Al Rashid Contracting Co.',
                'location' => 'Riyadh',
                'vacancy' => 25,
                'salary' => 'SAR 2,000 – 2,500 / month',
                'contract_duration' => '2 years (renewable)',
                'working_hours' => '8 hours/day, 6 days/week',
                'interview_date' => '2026-11-15',
                'interview_type' => 'Delegation Interview',
                'interview_venue' => 'Dhaka Trade Testing Center, Kakrail',
                'req_experience' => 'Minimum 3 years in commercial wiring',
                'req_education' => 'Diploma or ITI in Electrical',
                'req_age' => '22 – 40 years',
                'req_gender' => 'Male',
                'desc_en' => 'Al Rashid Contracting is hiring skilled electricians for commercial high-rise projects in Riyadh.',
                'desc_bn' => 'রিয়াদে বড় বাণিজ্যিক এবং আবাসিক প্রকল্পের জন্য দক্ষ ইলেকট্রিক্যাল টেকনিশিয়ান নিয়োগ দেওয়া হচ্ছে।',
                'req_candidate_en' => 'Must be able to read single line diagrams and perform LV termination.',
                'req_candidate_bn' => 'সিঙ্গেল লাইন ডায়াগ্রাম পড়তে এবং এলভি তারের সংযোগ সঠিকভাবে স্থাপন করতে সক্ষম হতে হবে।',
                'responsibilities_en' => 'Install, test, and maintain electrical wiring, conduits, fixtures, and control panels.',
                'responsibilities_bn' => 'বৈদ্যুতিক তার, কনডুইট এবং ডিস্ট্রিবিউশন বোর্ডের সংযোগ ও রক্ষণাবেক্ষণ।',
                'additional_info_en' => 'Trade test will be conducted prior to visa processing.',
                'additional_info_bn' => 'ভিসা প্রসেসিংয়ের পূর্বে কারিগরি পরীক্ষা অনুষ্ঠিত হবে।',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Employment / Work Visa',
                'visa_notes_en' => 'Company provides free visa and flight tickets.',
                'visa_notes_bn' => 'কোম্পানি সম্পূর্ণ বিনামূল্যে ভিসা এবং বিমান টিকিট প্রদান করবে।',
                'application_deadline' => '2026-11-30',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Heavy Duty Truck Driver',
                'title_bn' => 'হেভি ডিউটি ট্রাক ড্রাইভার',
                'prefix' => 'AE-HD',
                'country_id' => $countryMap['UAE'],
                'designation_id' => $designationMap['Heavy Vehicle Driver'],
                'employer_name' => 'Emirates Logistics Group',
                'location' => 'Dubai – Jebel Ali',
                'vacancy' => 15,
                'salary' => 'AED 2,800 – 3,200 / month',
                'contract_duration' => '2 years',
                'working_hours' => '9 hours/day, 6 days/week',
                'interview_date' => null, // To be announced
                'interview_type' => 'To be announced',
                'interview_venue' => 'Will be notified via SMS/WhatsApp',
                'req_experience' => 'Minimum 4 years heavy vehicle driving',
                'req_education' => 'SSC or equivalent',
                'req_age' => '25 – 45 years',
                'req_gender' => 'Male',
                'desc_en' => 'Looking for experienced trailer and heavy dump truck drivers for port logistics operations in Jebel Ali.',
                'desc_bn' => 'দুবাই জেবেল আলী পোর্টে কন্টেইনার এবং ট্রেইলার চালানোর জন্য অভিজ্ঞ হেভি ড্রাইভার প্রয়োজন।',
                'benefits' => ['accommodation' => true, 'food' => false, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Employment Visa',
                'application_deadline' => '2026-11-20',
                'status' => 'Published',
            ],
            [
                'title_en' => 'General Construction Worker',
                'title_bn' => 'সাধারণ নির্মাণ শ্রমিক',
                'prefix' => 'QA-CW',
                'country_id' => $countryMap['Qatar'],
                'designation_id' => $designationMap['General Construction Worker'],
                'employer_name' => 'Al Khor Building Contractors',
                'location' => 'Doha & Lusail',
                'vacancy' => 60,
                'salary' => 'QAR 1,200 + 300 (Food) / month',
                'contract_duration' => '2 years',
                'working_hours' => '8 hours/day',
                'interview_date' => '2026-11-10',
                'interview_type' => 'Online Interview',
                'interview_venue' => 'Zoom Interview arranged by agency',
                'req_experience' => '1-2 years construction work',
                'req_education' => 'Primary or Basic Literacy',
                'req_age' => '21 – 38 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Work Visa',
                'application_deadline' => '2026-11-25',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Hotel Housekeeping Attendant',
                'title_bn' => 'হোটেল হাউসকিপিং অ্যাটেনডেন্ট',
                'prefix' => 'AE-HK',
                'country_id' => $countryMap['UAE'],
                'designation_id' => $designationMap['Hotel Staff'],
                'employer_name' => 'Corniche Grand Hotels',
                'location' => 'Abu Dhabi',
                'vacancy' => 20,
                'salary' => 'AED 1,600 + Service Charge',
                'contract_duration' => '2 years',
                'working_hours' => '8 hours/day, rotating shift',
                'interview_date' => '2026-11-18',
                'interview_type' => 'Delegation Interview',
                'interview_venue' => 'Hotel Sarina, Banani, Dhaka',
                'req_experience' => '1 year in 3-star or above hotel',
                'req_education' => 'HSC or Hotel Management Certificate',
                'req_age' => '20 – 32 years',
                'req_gender' => 'Male / Female',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => false],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Employment Visa',
                'application_deadline' => '2026-11-28',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Pipe Welder (6G)',
                'title_bn' => 'পাইপ ওয়েল্ডার (৬জি)',
                'prefix' => 'SA-WD',
                'country_id' => $countryMap['Saudi Arabia'],
                'designation_id' => $designationMap['Welder'],
                'employer_name' => 'Eastern Industrial Services',
                'location' => 'Jubail Industrial City',
                'vacancy' => 18,
                'salary' => 'SAR 2,800 – 3,500 / month',
                'contract_duration' => '2 years',
                'working_hours' => '8 hours/day',
                'interview_date' => '2026-11-12',
                'interview_type' => 'CV Selection / Pushing',
                'interview_venue' => 'Selected candidates will undergo X-ray welding test',
                'req_experience' => 'Minimum 5 years in refinery/oil & gas pipeline welding',
                'req_education' => 'TTC Certificate or Vocational Diploma',
                'req_age' => '24 – 42 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Work Visa',
                'application_deadline' => '2026-11-15',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Security Guard',
                'title_bn' => 'সিকিউরিটি গার্ড',
                'prefix' => 'QA-SG',
                'country_id' => $countryMap['Qatar'],
                'designation_id' => $designationMap['Security Guard'],
                'employer_name' => 'Pearl Shield Security Services',
                'location' => 'Doha',
                'vacancy' => 40,
                'salary' => 'QAR 1,500 + Accommodation',
                'contract_duration' => '2 years',
                'working_hours' => '12 hours/day (4 hrs OT included)',
                'interview_date' => '2026-11-22',
                'interview_type' => 'Delegation Interview',
                'interview_venue' => 'Armed Forces Club, Dhaka',
                'req_experience' => 'Height minimum 5 ft 8 in, Ex-Army/Police preferred',
                'req_education' => 'HSC Passed',
                'req_age' => '22 – 36 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => false, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Work Visa',
                'application_deadline' => '2026-12-05',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Factory Production Operator',
                'title_bn' => 'ফ্যাক্টরি প্রোডাকশন অপারেটর',
                'prefix' => 'RO-FW',
                'country_id' => $countryMap['Romania'],
                'designation_id' => $designationMap['Factory Worker'],
                'employer_name' => 'Carpathia Components SRL',
                'location' => 'Brasov',
                'vacancy' => 30,
                'salary' => 'EUR 650 – 750 / month Net',
                'contract_duration' => '2 years (Schengen Work Permit)',
                'working_hours' => '8 hours/day, 5 days/week',
                'interview_date' => null,
                'interview_type' => 'Online Interview',
                'interview_venue' => 'Video interview via Google Meet',
                'req_experience' => 'Basic assembly line or factory experience',
                'req_education' => 'SSC or equivalent',
                'req_age' => '20 – 38 years',
                'req_gender' => 'Male / Female',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Romania Work Permit (Schengen)',
                'application_deadline' => '2026-12-15',
                'status' => 'Published',
            ],
            [
                'title_en' => 'AC Technician (HVAC)',
                'title_bn' => 'এসি টেকনিশিয়ান (এইচভিএসি)',
                'prefix' => 'KW-AC',
                'country_id' => $countryMap['Kuwait'],
                'designation_id' => $designationMap['AC Technician'],
                'employer_name' => 'Gulf Cool Engineering',
                'location' => 'Kuwait City',
                'vacancy' => 12,
                'salary' => 'KWD 180 – 220 / month',
                'contract_duration' => '2 years',
                'working_hours' => '8 hours/day',
                'interview_date' => '2026-11-14',
                'interview_type' => 'Online Interview',
                'interview_venue' => 'Technical Trade Center, Tejgaon',
                'req_experience' => 'Minimum 3 years in split and central AC repair',
                'req_education' => 'Vocational Diploma in Refrigeration & AC',
                'req_age' => '23 – 40 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Work Visa',
                'application_deadline' => '2026-11-20',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Civil Site Supervisor',
                'title_bn' => 'সিভিল সাইট সুপারভাইজার',
                'prefix' => 'SA-SV',
                'country_id' => $countryMap['Saudi Arabia'],
                'designation_id' => $designationMap['Supervisor'],
                'employer_name' => 'Red Sea Infrastructure JV',
                'location' => 'Jeddah',
                'vacancy' => 6,
                'salary' => 'SAR 3,800 – 4,500 / month',
                'contract_duration' => '2 years',
                'working_hours' => '9 hours/day',
                'interview_date' => '2026-11-26',
                'interview_type' => 'Online Interview',
                'interview_venue' => 'Microsoft Teams interview',
                'req_experience' => '5+ years construction site supervision, Gulf experience needed',
                'req_education' => 'Diploma in Civil Engineering',
                'req_age' => '26 – 45 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => false],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Work Visa',
                'application_deadline' => '2026-12-01',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Delivery Van Driver',
                'title_bn' => 'ডেলিভারি ভ্যান ড্রাইভার',
                'prefix' => 'PL-DR',
                'country_id' => $countryMap['Poland'],
                'designation_id' => $designationMap['Driver'],
                'employer_name' => 'Vistula Logistics Sp. z o.o.',
                'location' => 'Warsaw',
                'vacancy' => 14,
                'salary' => 'PLN 4,200 – 4,800 Net / month',
                'contract_duration' => '2 years (Schengen Permit)',
                'working_hours' => '8 hours/day',
                'interview_date' => null,
                'interview_type' => 'To be announced',
                'interview_venue' => 'Online profile evaluation',
                'req_experience' => 'Valid professional driving license with 3 years clean record',
                'req_education' => 'SSC',
                'req_age' => '23 – 45 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => false, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Poland National D-Type Work Visa',
                'application_deadline' => '2026-12-10',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Commercial Cleaner',
                'title_bn' => 'কমার্শিয়াল ক্লিনার',
                'prefix' => 'MY-CL',
                'country_id' => $countryMap['Malaysia'],
                'designation_id' => $designationMap['Cleaner'],
                'employer_name' => 'KL Facility Management Sdn Bhd',
                'location' => 'Kuala Lumpur',
                'vacancy' => 25,
                'salary' => 'MYR 1,500 + OT',
                'contract_duration' => '3 years',
                'working_hours' => '8 hours/day, 6 days/week',
                'interview_date' => '2026-11-20',
                'interview_type' => 'CV Selection / Pushing',
                'interview_venue' => 'Agency Office, Motijheel',
                'req_experience' => 'Freshers or cleaners with building cleaning experience',
                'req_education' => 'Primary or Class 8',
                'req_age' => '20 – 40 years',
                'req_gender' => 'Male / Female',
                'benefits' => ['accommodation' => true, 'food' => false, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => true],
                'visa_fee_type' => 'Visa Fee',
                'visa_type' => 'Calling Visa (FWCS)',
                'application_deadline' => '2026-11-30',
                'status' => 'Published',
            ],
            [
                'title_en' => 'Accountant',
                'title_bn' => 'অ্যাকাউন্ট্যান্ট',
                'prefix' => 'SA-AC',
                'country_id' => $countryMap['Saudi Arabia'],
                'designation_id' => $designationMap['Accountant'],
                'employer_name' => 'Eastern Trading Est.',
                'location' => 'Dammam',
                'vacancy' => 2,
                'salary' => 'SAR 3,000 – 3,500 / month',
                'contract_duration' => '2 years',
                'working_hours' => '8 hours/day',
                'interview_date' => '2026-11-16',
                'interview_type' => 'Online Interview',
                'interview_venue' => 'Video interview on Zoom',
                'req_experience' => '3+ years experience with Tally / QuickBooks, English communication',
                'req_education' => 'B.Com / BBA in Accounting',
                'req_age' => '24 – 38 years',
                'req_gender' => 'Male',
                'benefits' => ['accommodation' => true, 'food' => true, 'transportation' => true, 'insurance' => true, 'airTicket' => true, 'overtime' => false],
                'visa_fee_type' => 'Visa Fee (All Costs Included)',
                'visa_type' => 'Commercial Work Visa',
                'application_deadline' => '2026-11-25',
                'status' => 'Published',
            ],
        ];

        $createdJobs = [];
        foreach ($jobsData as $j) {
            $createdJobs[] = Job::create($j);
        }

        // 6. Seed Applications (The 13 Quick Applications with 3 files)
        $sampleApplications = [
            ['user_idx' => 0, 'job_idx' => 0, 'exp' => '5 yrs', 'overseas' => false, 'loc' => 'Cumilla, Bangladesh', 'status' => 'Selected'],
            ['user_idx' => 1, 'job_idx' => 1, 'exp' => '4 yrs', 'overseas' => true, 'loc' => 'Pokhara, Nepal', 'status' => 'Pending'],
            ['user_idx' => 2, 'job_idx' => 0, 'exp' => '6 yrs', 'overseas' => true, 'loc' => 'Riyadh, Saudi Arabia', 'status' => 'Selected'],
            ['user_idx' => 3, 'job_idx' => 3, 'exp' => '2 yrs', 'overseas' => true, 'loc' => 'Cebu, Philippines', 'status' => 'Pending'],
            ['user_idx' => 4, 'job_idx' => 2, 'exp' => '3 yrs', 'overseas' => false, 'loc' => 'Noakhali, Bangladesh', 'status' => 'Pending'],
            ['user_idx' => 5, 'job_idx' => 4, 'exp' => '8 yrs', 'overseas' => true, 'loc' => 'Kochi, India', 'status' => 'Selected'],
            ['user_idx' => 6, 'job_idx' => 6, 'exp' => '2 yrs', 'overseas' => false, 'loc' => 'Gazipur, Bangladesh', 'status' => 'Pending'],
            ['user_idx' => 7, 'job_idx' => 1, 'exp' => '7 yrs', 'overseas' => true, 'loc' => 'Lahore, Pakistan', 'status' => 'Pending'],
            ['user_idx' => 8, 'job_idx' => 7, 'exp' => '4 yrs', 'overseas' => false, 'loc' => 'Chattogram, Bangladesh', 'status' => 'Pending'],
            ['user_idx' => 9, 'job_idx' => 5, 'exp' => '3 yrs', 'overseas' => false, 'loc' => 'Kumasi, Ghana', 'status' => 'Pending'],
            ['user_idx' => 10, 'job_idx' => 2, 'exp' => '2 yrs', 'overseas' => false, 'loc' => 'Dharan, Nepal', 'status' => 'Rejected'],
            ['user_idx' => 11, 'job_idx' => 8, 'exp' => '9 yrs', 'overseas' => true, 'loc' => 'Dubai, UAE', 'status' => 'Selected'],
            ['user_idx' => 12, 'job_idx' => 9, 'exp' => '4 yrs', 'overseas' => false, 'loc' => 'Amritsar, India', 'status' => 'Pending'],
        ];

        foreach ($sampleApplications as $app) {
            $u = $users[$app['user_idx']];
            $j = $createdJobs[$app['job_idx']];

            JobApplication::create([
                'job_id' => $j->id,
                'user_id' => $u->id,
                'full_name' => $u->name,
                'passport_number' => $u->passport_number,
                'mobile_number' => $u->phone,
                'experience_years' => $app['exp'],
                'has_overseas_experience' => $app['overseas'],
                'current_location' => $app['loc'],
                'cv_file_path' => '/storage/samples/' . str_replace(' ', '_', $u->name) . '_CV.pdf',
                'cv_file_name' => $u->name . ' - Professional CV.pdf',
                'passport_file_path' => '/storage/samples/' . str_replace(' ', '_', $u->name) . '_Passport.pdf',
                'passport_file_name' => $u->name . ' - Passport Scan.pdf',
                'photo_file_path' => '/storage/samples/' . str_replace(' ', '_', $u->name) . '_Photo.jpg',
                'photo_file_name' => $u->name . ' - Passport Size Photo.jpg',
                'status' => $app['status'],
            ]);
        }

        // 7. Seed Manpower CV Profiles (The Detailed Builder)
        // Candidate 0: Md. Rahim Uddin
        $rahim = $users[0];
        $cv1 = CvProfile::create([
            'user_id' => $rahim->id,
            'photo_path' => '/storage/samples/Md_Rahim_Uddin_Photo.jpg',
            'father_name' => 'Md. Shamsul Haque',
            'mother_name' => 'Fatema Begum',
            'dob' => '1995-04-12',
            'pob' => 'Cumilla',
            'nationality' => 'Bangladeshi',
            'gender' => 'Male',
            'marital_status' => 'Married',
            'religion' => 'Islam',
            'height' => '5 ft 7 in',
            'weight' => '68 kg',
            'passport_expiry' => '2032-08-20',
            'passport_issue_place' => 'Dhaka',
            'village_area' => 'Chandina, Ward 4',
            'post_office' => 'Chandina',
            'police_station' => 'Chandina',
            'district' => 'Cumilla',
            'country' => 'Bangladesh',
            'email' => $rahim->email,
            'languages' => ['Bangla', 'English', 'Arabic'],
        ]);

        CvAcademicQualification::create([
            'cv_profile_id' => $cv1->id,
            'degree' => 'SSC (Science)',
            'institution' => 'Chandina Pilot High School',
            'passing_year' => '2012',
            'result_grade' => 'GPA 4.50',
        ]);
        CvAcademicQualification::create([
            'cv_profile_id' => $cv1->id,
            'degree' => 'Diploma in Electrical Engineering',
            'institution' => 'Cumilla Polytechnic Institute',
            'passing_year' => '2016',
            'result_grade' => 'CGPA 3.48',
        ]);

        CvWorkExperience::create([
            'cv_profile_id' => $cv1->id,
            'job_title' => 'Junior Electrician',
            'company' => 'Dhaka Power Services Ltd.',
            'country' => 'Bangladesh',
            'start_date' => '2016-08-01',
            'end_date' => '2019-10-30',
            'is_current' => false,
        ]);
        CvWorkExperience::create([
            'cv_profile_id' => $cv1->id,
            'job_title' => 'Senior Electrical Technician',
            'company' => 'Eastern Mega Const. Co.',
            'country' => 'Bangladesh',
            'start_date' => '2019-11-15',
            'end_date' => '2022-12-31',
            'is_current' => false,
        ]);

        CvTraining::create([
            'cv_profile_id' => $cv1->id,
            'course_name' => 'Industrial Automation & PLC Wiring',
            'institute' => 'Bangladesh-Korea Technical Training Centre (BKTTC)',
            'duration' => '3 Months (360 Hours)',
        ]);

        // Candidate 2: Arif Hossain
        $arif = $users[2];
        $cv2 = CvProfile::create([
            'user_id' => $arif->id,
            'photo_path' => '/storage/samples/Arif_Hossain_Photo.jpg',
            'father_name' => 'Abdul Kader',
            'mother_name' => 'Rokeya Khatun',
            'dob' => '1992-07-18',
            'pob' => 'Brahmanbaria',
            'nationality' => 'Bangladeshi',
            'gender' => 'Male',
            'marital_status' => 'Married',
            'religion' => 'Islam',
            'height' => '5 ft 8 in',
            'weight' => '72 kg',
            'passport_expiry' => '2030-05-15',
            'passport_issue_place' => 'Dhaka',
            'village_area' => 'Sarail, West Para',
            'post_office' => 'Sarail',
            'police_station' => 'Sarail',
            'district' => 'Brahmanbaria',
            'country' => 'Saudi Arabia',
            'email' => $arif->email,
            'languages' => ['Bangla', 'English', 'Arabic', 'Hindi'],
        ]);

        CvAcademicQualification::create([
            'cv_profile_id' => $cv2->id,
            'degree' => 'Trade Certificate (Electrical)',
            'institution' => 'Brahmanbaria Technical School',
            'passing_year' => '2010',
            'result_grade' => 'First Division',
        ]);

        CvWorkExperience::create([
            'cv_profile_id' => $cv2->id,
            'job_title' => 'Electrical Maintenance Specialist',
            'company' => 'Binladin Group Facility Div.',
            'country' => 'Saudi Arabia',
            'start_date' => '2018-02-01',
            'end_date' => '2024-03-31',
            'is_current' => false,
        ]);

        CvTraining::create([
            'cv_profile_id' => $cv2->id,
            'course_name' => 'High Voltage Safety & Circuit Breakers',
            'institute' => 'Saudi Electric Training Institute, Riyadh',
            'duration' => '6 Weeks',
        ]);
    }
}
