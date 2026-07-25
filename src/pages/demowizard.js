import React, { useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import logOff from '@iconify-icons/gg/log-off';
import { NavLink, useNavigate } from 'react-router-dom';

const formSteps = [
  "Identity & Credentials",
  "Professional Details",
  "Academic Backing",
  "Career Intentions",
  "Personal Matrix",
  "Attachments Upload"
];

export default function ProfileFormWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '', email: '', password: '', mobile: '', workStatus: 'Fresher',
    // Step 2
    currentDesignation: '', currentCompany: '', totalExperienceYears: '', totalExperienceMonths: '', currentCtc: '', noticePeriod: 'Immediate', skills: '',
    // Step 3
    highestQualification: 'Graduation', courseDegree: '', specialization: '', university: '', courseType: 'Full Time', passingYear: '',
    // Step 4
    currentLocation: '', preferredLocations: '', preferredIndustry: '', roleCategory: '', desiredEmploymentType: 'Permanent', desiredJobType: 'Full-time', resumeHeadline: '', profileSummary: '',
    // Step 5
    dob: '', gender: 'Male', permanentAddress: '', linkedinProfile: '', languagesInput: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executePayloadSubmission = async () => {
    const multiPartFormData = new FormData();
    
    // Transform text metrics back into deep relational backend structures
    const complexUserPayload = {
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      workStatus: formData.workStatus,
      professionalDetails: formData.workStatus === 'Experienced' ? {
        currentDesignation: formData.currentDesignation,
        currentCompany: formData.currentCompany,
        totalExperienceYears: formData.totalExperienceYears,
        totalExperienceMonths: formData.totalExperienceMonths,
        currentCtc: formData.currentCtc,
        noticePeriod: formData.noticePeriod,
        skills: formData.skills.split(',').map(s => s.trim())
      } : { skills: formData.skills.split(',').map(s => s.trim()) },
      academicDetails: {
        highestQualification: formData.highestQualification,
        courseDegree: formData.courseDegree,
        specialization: formData.specialization,
        university: formData.university,
        courseType: formData.courseType,
        passingYear: formData.passingYear
      },
      careerPreferences: {
        currentLocation: formData.currentLocation,
        preferredLocations: formData.preferredLocations.split(',').map(l => l.trim()),
        preferredIndustry: formData.preferredIndustry,
        roleCategory: formData.roleCategory,
        desiredEmploymentType: formData.desiredEmploymentType,
        desiredJobType: formData.desiredJobType,
        resumeHeadline: formData.resumeHeadline,
        profileSummary: formData.profileSummary
      },
      personalDetails: {
        dateOfBirth: formData.dob,
        gender: formData.gender,
        permanentAddress: formData.permanentAddress,
        linkedinProfile: formData.linkedinProfile,
        languagesKnown: {
          "English": "Read,Write,Speak", // Dynamic matrix parsing placeholder
          "Primary": formData.languagesInput
        }
      }
    };

    multiPartFormData.append("userData", JSON.stringify(complexUserPayload));
    if (resumeFile) multiPartFormData.append("resume", resumeFile);
    if (photoFile) multiPartFormData.append("photo", photoFile);

    try {
      await axios.post('http://localhost:8080/api/profiles/submit', multiPartFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Application Profile submitted completely!");
      const newTab = window.open('/profileWizard', '_blank', 'noopener,noreferrer');
  if (newTab) newTab.focus();
    } catch (err) {
      console.error("Payload execution error:", err);
       const newTab = window.open('/profileWizard', '_blank', 'noopener,noreferrer');
  if (newTab) newTab.focus();
    }
  };

  return (
    <div>
      <div className='h-14 flex items-center justify-between px-10 bg-[#817AEB]'>
<span>

</span>
<NavLink to='/' className='text-white flex items-center gap-1 cursor-pointer font-semibold'>
  <Icon className='w-5 h-5' icon={logOff} />
  Logout
</NavLink>
      </div>
    <div className='px-12 py-4' style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      
      {/* Step Progress Tracker Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
        {formSteps.map((stepName, index) => (
          <div key={index} style={{ opacity: index === currentStep ? 1 : 0.4, textAlign: 'center', flex: 1 }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: index <= currentStep ? '#817AEB' : '#ccc', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: '12px' }}>
              {index + 1}
            </div>
            <small style={{ fontSize: '10px', display: 'block', fontWeight: index === currentStep ? 'bold' : 'normal' }}>{stepName}</small>
          </div>
        ))}
      </div>

      <div style={{ minHeight: '340px', marginBottom: '24px' }}>
        
        {/* STEP 1: IDENTITY */}
        {currentStep === 0 && (
          <div>
            <h3 style={headerStyle}>1. Basic Identity Details</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} style={inputStyle}/>
            <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleInputChange} style={inputStyle}/>
            <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleInputChange} style={inputStyle}/>
            <div style={{ margin: '16px 0' }}>
              <span style={{ marginRight: '16px', fontWeight: 'bold' }}>Work Status:</span>
              <label><input type="radio" name="workStatus" value="Fresher" checked={formData.workStatus === 'Fresher'} onChange={handleInputChange}/> I am a Fresher</label>
              <label style={{ marginLeft: '16px' }}><input type="radio" name="workStatus" value="Experienced" checked={formData.workStatus === 'Experienced'} onChange={handleInputChange}/> I am Experienced</label>
            </div>
          </div>
        )}

        {/* STEP 2: PROFESSIONAL */}
        {currentStep === 1 && (
          <div>
            <h3 style={headerStyle}>2. Employment & Professional Details</h3>
            {formData.workStatus === 'Fresher' ? (
              <p style={{ color: '#666', fontItalic: 'true' }}>You selected 'Fresher'. Key skills can be input below; employment variables are locked.</p>
            ) : (
              <>
                <input type="text" name="currentDesignation" placeholder="Current Designation" value={formData.currentDesignation} onChange={handleInputChange} style={inputStyle}/>
                <input type="text" name="currentCompany" placeholder="Current Company / Organization" value={formData.currentCompany} onChange={handleInputChange} style={inputStyle}/>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="number" name="totalExperienceYears" placeholder="Years of Experience" value={formData.totalExperienceYears} onChange={handleInputChange} style={inputStyle}/>
                  <input type="number" name="totalExperienceMonths" placeholder="Months of Experience" value={formData.totalExperienceMonths} onChange={handleInputChange} style={inputStyle}/>
                </div>
                <input type="text" name="currentCtc" placeholder="Current Salary (CTC in Lakhs per annum)" value={formData.currentCtc} onChange={handleInputChange} style={inputStyle}/>
                <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} style={inputStyle}>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                </select>
              </>
            )}
            <input type="text" name="skills" placeholder="Key Skills (Comma separated tags: Java, Spring, React)" value={formData.skills} onChange={handleInputChange} style={inputStyle}/>
          </div>
        )}

        {/* STEP 3: ACADEMIC */}
        {currentStep === 2 && (
          <div>
            <h3 style={headerStyle}>3. Education & Academic Details</h3>
            <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} style={inputStyle}>
              <option value="Below 10th/12th">Below 10th/12th</option>
              <option value="Graduation">Graduation</option>
              <option value="Post Graduation">Post Graduation</option>
              <option value="Doctorate">Doctorate</option>
            </select>
            <input type="text" name="courseDegree" placeholder="Course / Degree (e.g. B.Tech, MBA)" value={formData.courseDegree} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="specialization" placeholder="Specialization / Stream" value={formData.specialization} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="university" placeholder="University / Institute Name" value={formData.university} onChange={handleInputChange} style={inputStyle}/>
            <div style={{ margin: '14px 0' }}>
              <label><input type="radio" name="courseType" value="Full Time" checked={formData.courseType === 'Full Time'} onChange={handleInputChange}/> Full Time</label>
              <label style={{ marginLeft: '16px' }}><input type="radio" name="courseType" value="Part Time" checked={formData.courseType === 'Part Time'} onChange={handleInputChange}/> Part Time</label>
              <label style={{ marginLeft: '16px' }}><input type="radio" name="courseType" value="Correspondence/Distance" checked={formData.courseType === 'Correspondence/Distance'} onChange={handleInputChange}/> Distance</label>
            </div>
            <input type="text" name="passingYear" placeholder="Passing Year (YYYY)" value={formData.passingYear} onChange={handleInputChange} style={inputStyle}/>
          </div>
        )}

        {/* STEP 4: CAREER PREFERENCES */}
        {currentStep === 3 && (
          <div>
            <h3 style={headerStyle}>4. Career Preferences & Summary</h3>
            <input type="text" name="currentLocation" placeholder="Current Location / City" value={formData.currentLocation} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="preferredLocations" placeholder="Preferred Target Work Locations (Comma separated)" value={formData.preferredLocations} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="preferredIndustry" placeholder="Preferred Industry / Department" value={formData.preferredIndustry} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="roleCategory" placeholder="Target Role Category" value={formData.roleCategory} onChange={handleInputChange} style={inputStyle}/>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <select name="desiredEmploymentType" value={formData.desiredEmploymentType} onChange={handleInputChange} style={inputStyle}>
                <option value="Permanent">Permanent</option>
                <option value="Contractual">Contractual</option>
              </select>
              <select name="desiredJobType" value={formData.desiredJobType} onChange={handleInputChange} style={inputStyle}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Work from home">Work from home</option>
              </select>
            </div>

            <input type="text" name="resumeHeadline" placeholder="Resume Headline (e.g. Senior Java Developer with 5 Yrs Exp)" value={formData.resumeHeadline} onChange={handleInputChange} style={inputStyle}/>
            <textarea name="profileSummary" placeholder="Profile Summary Paragraph..." value={formData.profileSummary} onChange={handleInputChange} style={{ ...inputStyle, height: '80px', resize: 'vertical' }}/>
          </div>
        )}

        {/* STEP 5: PERSONAL DATA */}
        {currentStep === 4 && (
          <div>
            <h3 style={headerStyle}>5. Personal Details</h3>
            <label style={{ fontSize: '12px', color: '#555' }}>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} style={inputStyle}/>
            
            <select name="gender" value={formData.gender} onChange={handleInputChange} style={inputStyle}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
            
            <input type="text" name="permanentAddress" placeholder="Permanent Address" value={formData.permanentAddress} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="languagesInput" placeholder="Known Languages & Proficiency (e.g., Hindi: Read,Write; Spanish: Speak)" value={formData.languagesInput} onChange={handleInputChange} style={inputStyle}/>
            <input type="text" name="linkedinProfile" placeholder="LinkedIn Profile Social URL Link" value={formData.linkedinProfile} onChange={handleInputChange} style={inputStyle}/>
          </div>
        )}

        {/* STEP 6: ATTACHMENTS */}
        {currentStep === 5 && (
          <div>
            <h3 style={headerStyle}>6. Document Attachments</h3>
      <div className='mt-4' style={{ marginBottom: '20px', padding: '20px', border: '2px dashed #817AEB', borderRadius: '12px', background: '#fcfcff' }}>
  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'semibold', color: '#817AEB' }}>
    Upload Resume *
  </label>
  
  {/* The Hidden Input */}
  <input className=''
    type="file" 
    id="resume-upload" 
    accept=".pdf,.doc,.docx" 
    onChange={(e) => setResumeFile(e.target.files[0])} 
    style={{ display: 'none' }} 
  />
  
  {/* The Custom Visual Trigger */}
  <label 
    htmlFor="resume-upload" 
    style={{ 
      cursor: 'pointer', 
      padding: '10px 20px', 
      background: '#817AEB', 
      color: '#fff', 
      borderRadius: '6px', 
      display: 'inline-block',
      fontWeight: '600' 
    }}
  >
    {resumeFile ? resumeFile.name : 'Select File'}
  </label>
</div>

      <div className='mt-4' style={{ marginBottom: '20px', padding: '20px', border: '2px dashed #817AEB', borderRadius: '12px', background: '#fcfcff' }}>
  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'semibold', color: '#817AEB' }}>
Profile Photo (Optional)  </label>
  
  {/* The Hidden Input */}
  <input className=''
    type="file" 
    id="profile-upload" 
    accept="image/*"
    onChange={(e) => setPhotoFile(e.target.files[0])} 
    style={{ display: 'none' }} 
  />
  
  {/* The Custom Visual Trigger */}
  <label 
    htmlFor="profile-upload" 
    style={{ 
      cursor: 'pointer', 
      padding: '10px 20px', 
      background: '#817AEB', 
      color: '#fff', 
      borderRadius: '6px', 
      display: 'inline-block',
      fontWeight: '600' 
    }}
  >
    {resumeFile ? resumeFile.name : 'Select File'}
  </label>
</div>

          </div>
        )}

      </div>

      {/* Navigation Control Buttons Footer Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button disabled={currentStep === 0} onClick={() => setCurrentStep(curr => curr - 1)} style={{ ...btnStyle, background: currentStep === 0 ? '#ccc' : '#6c757d' }}>Back</button>
        {currentStep < formSteps.length - 1 ? (
          <button onClick={() => setCurrentStep(curr => curr + 1)} style={btnStyle}>Next Step</button>
        ) : (
          <button onClick={executePayloadSubmission} style={{ ...btnStyle, background: '#10b981' }}>Submit</button>
        )}
      </div>

    </div>
    </div>

  );
}

const headerStyle = { color: '#333', inlineSize: 'max-content',fontWeight:700 };
const inputStyle = { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' };
const btnStyle = { padding: '10px 24px', background: '#817AEB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' };