import React, { useState, useEffect } from "react"
import axios from "axios"
import { DownloadIcon, LinkedinIcon, X } from "lucide-react"
import { InstagramFilled, LinkedinFilled, TwitterSquareFilled, XFilled, XOutlined } from "@ant-design/icons"

// --- Inline SVGs (Lucide React alternatives) ---
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-pencil"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
)
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-trash-2"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
)
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-upload-cloud"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
)
const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-indigo-600"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
)

export default function ProfileForm() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)

  // Section Edit State Trackers
  const [editingSection, setEditingSection] = useState(null) // 'identity', 'professional', 'academic', 'career', 'personal'
  const [editFormData, setEditFormData] = useState({})

  // Dynamic user context routing (using mock primary key ID 1 for execution context)
  const userId = 1

  useEffect(() => {
    fetchProfileDetails()
  }, [])

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const fetchProfileDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:8080/api/profiles/${userId}`
      )
      setProfile(response.data)
      setError(null)
    } catch (err) {
      // Setup detailed mock profile fallback structure if Spring Boot backend is starting up or offline
      setProfile({
        id: 1,
        fullName: "Alice",
        email: "alice@sadetech.com",
        mobile: "+91 9876543210",
        workStatus: "Experienced",
        professionalDetails: {
          currentDesignation: "Lead Systems Engineer",
          currentCompany: "Sade Techno Solutions",
          totalExperienceYears: "5",
          totalExperienceMonths: "8",
          currentCtc: "14.5",
          noticePeriod: "15 Days",
          skills: [
            "Java",
            "Spring Boot",
            "React",
            "PostgreSQL",
            "AWS S3",
            "Docker"
          ]
        },
        academicDetails: {
          highestQualification: "Graduation",
          courseDegree: "B.Tech",
          specialization: "Computer Science & Engineering",
          university: "Anna University",
          courseType: "Full Time",
          passingYear: "2020"
        },
        careerPreferences: {
          currentLocation: "Chennai",
          preferredLocations: ["Chennai", "Bengaluru", "Hyderabad"],
          preferredIndustry: "IT Services & Consulting",
          roleCategory: "Software Development",
          desiredEmploymentType: "Permanent",
          desiredJobType: "Full-time",
          resumeHeadline:
            "Enterprise Java Developer | Cloud Orchestration & Security Advocate",
          profileSummary:
            "Highly analytical and performance-focused Software Engineer with over 5 years of rich technical expertise in structuring REST APIs with Java Spring Boot and engineering responsive frontend views using React. Proven ability to guide agile teams and build scalable architectures."
        },
        personalDetails: {
          dateOfBirth: "1998-05-14",
          gender: "Male",
          permanentAddress: "No. 42, Mount Road, Guindy, Chennai - 600032",
          languagesKnown: {
            English: "Read,Write,Speak",
            Tamil: "Read,Write,Speak"
          },
          linkedinProfile: "https://www.linkedin.com/in/siddharth-dev-sade"
        },
        documents: {
          resumeUrl: "http://localhost:8080/uploads/dummy_resume.pdf",
          photoUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250"
        }
      })
      setError(
""      )
    } finally {
      setLoading(false)
    }
  }

  const handleEditInit = (section, initialData) => {
    setEditingSection(section)
    setEditFormData({ ...initialData })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setEditFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = e => {
    const skillsArray = e.target.value.split(",").map(s => s.trim())
    setEditFormData(prev => ({ ...prev, skills: skillsArray }))
  }

  const handlePrefLocationsChange = e => {
    const locationsArray = e.target.value.split(",").map(l => l.trim())
    setEditFormData(prev => ({ ...prev, preferredLocations: locationsArray }))
  }

  const saveSectionChanges = async section => {
    try {
      let response
      if (section === "identity") {
        response = await axios.put(
          `http://localhost:8080/api/profiles/${userId}/identity`,
          editFormData
        )
      } else if (section === "professional") {
        response = await axios.put(
          `http://localhost:8080/api/profiles/${userId}/professional`,
          editFormData
        )
      } else if (section === "academic") {
        response = await axios.put(
          `http://localhost:8080/api/profiles/${userId}/academic`,
          editFormData
        )
      } else if (section === "career") {
        response = await axios.put(
          `http://localhost:8080/api/profiles/${userId}/career`,
          editFormData
        )
      } else if (section === "personal") {
        response = await axios.put(
          `http://localhost:8080/api/profiles/${userId}/personal`,
          editFormData
        )
      }

      setProfile(response.data)
      setEditingSection(null)
      showToast(
        `${section.charAt(0).toUpperCase() +
          section.slice(1)} details updated successfully.`
      )
    } catch (err) {
      // Local fallback simulator logic
      setProfile(prev => {
        const updated = { ...prev }
        if (section === "identity") {
          updated.fullName = editFormData.fullName
          updated.email = editFormData.email
          updated.mobile = editFormData.mobile
          updated.workStatus = editFormData.workStatus
        } else {
          updated[`${section}Details`] = editFormData
        }
        return updated
      })
      setEditingSection(null)
      showToast(
        `Simulated changes saved to state. (Backend currently unreachable)`,
        "warning"
      )
    }
  }

  const handleFileUpload = async (e, fileType) => {
    const targetFile = e.target.files[0]
    if (!targetFile) return

    const fileUploadData = new FormData()
    fileUploadData.append("fileType", fileType)
    fileUploadData.append("file", targetFile)

    try {
      const response = await axios.post(
        `http://localhost:8080/api/profiles/${userId}/upload`,
        fileUploadData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      setProfile(response.data)
      showToast(`${fileType.toUpperCase()} file uploaded successfully.`)
    } catch (err) {
      // Local dynamic simulated fallback path
      const fakeUrl = URL.createObjectURL(targetFile)
      setProfile(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [`${fileType}Url`]: fakeUrl
        }
      }))
      showToast(
        `File mock-cached inside React browser state successfully!`,
        "warning"
      )
    }
  }

  const handleFileDeletion = async fileType => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/profiles/${userId}/document?fileType=${fileType}`
      )
      setProfile(response.data)
      showToast(`${fileType.toUpperCase()} asset deleted completely.`)
    } catch (err) {
      setProfile(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [`${fileType}Url`]: null
        }
      }))
      showToast(
        `Mock removed ${fileType} reference from client state.`,
        "warning"
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-550">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold">
            Gathering Comprehensive Profile Blueprint...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Toast Notification HUD */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white transition-all duration-300 transform translate-y-0 ${
            toast.type === "success" ? "bg-emerald-600" : "bg-amber-600"
          }`}
        >
          <span className="font-semibold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#817AEB] text-white flex items-center justify-center font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                Candidate Profile
              </h1>
              <p className="text-xs text-slate-500">
                Relational View System &bull; Sade Techno Solutions
              </p>
            </div>
          </div>
          {error && (
            <div className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-md font-medium">
              {error}
            </div>
          )}
        </div>
      </header>

      {/* Profile Container Grid */}
      <main className="max-w-5xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: HERO AVATAR & QUICK JUMP TRACKS */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* PHOTO BOX */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center shadow-sm">
            <div className="relative group w-36 h-36 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-100 flex items-center justify-center mb-4">
              {profile.documents?.photoUrl ? (
                <img
                  src={profile.documents.photoUrl}
                  alt="Avatar Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-slate-400 font-medium text-xs text-center px-4">
                  No Profile Picture
                </span>
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900 text-center">
              {profile.fullName}
            </h2>
            <p className="text-sm text-slate-500 font-semibold text-center mt-1">
              {profile.professionalDetails?.currentDesignation ||
                "Aspiring Specialist"}
            </p>

                            <div className="border-t border-slate-100 pt-4">

                  <p className="font-semibold text-slate-800 leading-relaxed text-sm bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/40">
                    "{profile.careerPreferences?.resumeHeadline}"
                  </p>
                </div>

            <div className="flex items-center gap-4 mt-4">
                <div className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center">
   <LinkedinFilled />
                </div >
                <div className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center">
               <InstagramFilled />
                </div >
                <div className="bg-indigo-500 text-white rounded-full w-9 h-9 flex items-center justify-center">
                    <XOutlined className="w-4 h-4" />
                </div>

            </div>


            

            {/* <div className="flex gap-4 w-full justify-center">
            
              <label className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg cursor-pointer transition text-xs font-semibold">
                <UploadIcon />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, "photo")}
                  className="hidden"
                />
              </label>
              {profile.documents?.photoUrl && (
                <button
                  onClick={() => handleFileDeletion("photo")}
                  className="flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition text-xs font-semibold"
                >
                  <TrashIcon />
                  <span>Delete</span>
                </button>
              )}
            </div> */}
          </div>

          {/* QUICK LINKS SECTION NAVIGATOR */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm sticky top-24 hidden md:block">
                          <div className="border-t border-slate-100">
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-2">
                    Technical Skills & Expertise
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {profile.professionalDetails?.skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-indigo-500 rounded-md"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
          </div>


            <div className="flex sticky top-64 flex-col gap-4">
              {/* RESUME BOX */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <FileIcon />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Professional Resume
                    </h4>
                    {/* {profile.documents?.resumeUrl ? (
                      <a
                        href={profile.documents.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:underline font-semibold block mt-0.5"
                      >
                        Download / View Uploaded Resume ↗
                      </a>
                    ) : (
                      <span className="text-xs text-rose-500 font-semibold block mt-0.5">
                        No Resume Uploaded
                      </span>
                    )} */}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer transition text-xs font-bold">
                    <DownloadIcon className="text-indigo-500" />
                 
               
                  </label>
          
                </div>
              </div>
            </div>
        </div>

        {/* RIGHT COLUMN: SINGLE COMPREHENSIVE SCROLLABLE CONTEXT VIEW */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* SECTION 1: IDENTITY DETAILS */}
          <section
            id="identity-sec"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Identity & Base Credentials
                </h3>
              </div>
              {/* {editingSection !== "identity" && (
                <button
                  onClick={() =>
                    handleEditInit("identity", {
                      fullName: profile.fullName,
                      email: profile.email,
                      mobile: profile.mobile,
                      workStatus: profile.workStatus
                    })
                  }
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <EditIcon />
                </button>
              )} */}
            </div>

            {editingSection === "identity" ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Email ID
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={editFormData.mobile}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                    Work Status
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="radio"
                        name="workStatus"
                        value="Fresher"
                        checked={editFormData.workStatus === "Fresher"}
                        onChange={handleInputChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />{" "}
                      I am a Fresher
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="radio"
                        name="workStatus"
                        value="Experienced"
                        checked={editFormData.workStatus === "Experienced"}
                        onChange={handleInputChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />{" "}
                      I am Experienced
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveSectionChanges("identity")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#817AEB] hover:bg-indigo-700 rounded-lg shadow transition"
                  >
                    Save Section
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Full Name
                  </span>
                  <span className="font-semibold text-slate-800">
                    {profile.fullName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Work Status
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 inline-block mt-0.5">
                    {profile.workStatus}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Email Address
                  </span>
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Mobile Contact
                  </span>
                  <span className="font-medium">{profile.mobile}</span>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 2: PROFESSIONAL DETAILS */}
          <section
            id="professional-sec"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Employment & Professional Profile
                </h3>
              </div>
              {/* {editingSection !== "professional" && (
                <button
                  onClick={() =>
                    handleEditInit(
                      "professional",
                      profile.professionalDetails || { skills: [] }
                    )
                  }
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <EditIcon />
                </button>
              )} */}
            </div>

            {editingSection === "professional" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Current Designation
                    </label>
                    <input
                      type="text"
                      name="currentDesignation"
                      value={editFormData.currentDesignation || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={editFormData.currentCompany || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Experience Years
                    </label>
                    <input
                      type="number"
                      name="totalExperienceYears"
                      value={editFormData.totalExperienceYears || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Experience Months
                    </label>
                    <input
                      type="number"
                      name="totalExperienceMonths"
                      value={editFormData.totalExperienceMonths || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Annual CTC (Lakhs INR)
                    </label>
                    <input
                      type="text"
                      name="currentCtc"
                      value={editFormData.currentCtc || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Notice Period
                    </label>
                    <select
                      name="noticePeriod"
                      value={editFormData.noticePeriod || "Immediate"}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Immediate">Immediate</option>
                      <option value="15 Days">15 Days</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={editFormData.skills?.join(", ") || ""}
                      onChange={handleSkillsChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveSectionChanges("professional")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#817AEB] hover:bg-indigo-700 rounded-lg shadow transition"
                  >
                    Save Section
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {profile.workStatus === "Fresher" ? (
                  <p className="text-slate-500 italic text-sm">
                    Registered as a Fresher. No core enterprise employment
                    metrics archived.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm mb-6">
                    <div>
                      <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Current Title
                      </span>
                      <span className="font-semibold text-slate-800">
                        {profile.professionalDetails?.currentDesignation ||
                          "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Current Employer
                      </span>
                      <span className="font-semibold text-slate-800">
                        {profile.professionalDetails?.currentCompany || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Total Experience
                      </span>
                      <span className="font-medium">
                        {profile.professionalDetails?.totalExperienceYears}{" "}
                        Years,{" "}
                        {profile.professionalDetails?.totalExperienceMonths}{" "}
                        Months
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Annual Package (CTC)
                      </span>
                      <span className="font-medium">
                        {profile.professionalDetails?.currentCtc} LPA
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                        Notice Period Status
                      </span>
                      <span className="font-medium">
                        {profile.professionalDetails?.noticePeriod}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            )}
          </section>

          {/* SECTION 3: ACADEMIC DETAILS */}
          <section
            id="academic-sec"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Education & Academic Record
                </h3>
              </div>
              {/* {editingSection !== "academic" && (
                <button
                  onClick={() =>
                    handleEditInit("academic", profile.academicDetails || {})
                  }
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <EditIcon />
                </button>
              )} */}
            </div>

            {editingSection === "academic" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Highest Qualification
                    </label>
                    <select
                      name="highestQualification"
                      value={editFormData.highestQualification || "Graduation"}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Below 10th/12th">Below 10th/12th</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Post Graduation">Post Graduation</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Course / Degree
                    </label>
                    <input
                      type="text"
                      name="courseDegree"
                      value={editFormData.courseDegree || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Specialization / Stream
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={editFormData.specialization || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      University / Institute
                    </label>
                    <input
                      type="text"
                      name="university"
                      value={editFormData.university || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Course Type
                    </label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          type="radio"
                          name="courseType"
                          value="Full Time"
                          checked={editFormData.courseType === "Full Time"}
                          onChange={handleInputChange}
                        />{" "}
                        Full Time
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          type="radio"
                          name="courseType"
                          value="Part Time"
                          checked={editFormData.courseType === "Part Time"}
                          onChange={handleInputChange}
                        />{" "}
                        Part Time
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          type="radio"
                          name="courseType"
                          value="Correspondence/Distance"
                          checked={
                            editFormData.courseType ===
                            "Correspondence/Distance"
                          }
                          onChange={handleInputChange}
                        />{" "}
                        Correspondence
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Passing Year (YYYY)
                    </label>
                    <input
                      type="text"
                      name="passingYear"
                      value={editFormData.passingYear || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveSectionChanges("academic")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#817AEB] hover:bg-indigo-700 rounded-lg shadow transition"
                  >
                    Save Section
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Highest Qualification
                  </span>
                  <span className="font-semibold text-slate-800">
                    {profile.academicDetails?.highestQualification || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Course / Degree
                  </span>
                  <span className="font-semibold text-slate-800">
                    {profile.academicDetails?.courseDegree} -{" "}
                    {profile.academicDetails?.specialization}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    University / College
                  </span>
                  <span className="font-medium text-slate-700">
                    {profile.academicDetails?.university}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Course Mode
                  </span>
                  <span className="font-medium text-slate-700">
                    {profile.academicDetails?.courseType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Year of Graduation
                  </span>
                  <span className="font-semibold text-indigo-600">
                    {profile.academicDetails?.passingYear}
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: CAREER PREFERENCES */}
          <section
            id="career-sec"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Career Preferences & Professional Summary
                </h3>
              </div>
              {/* {editingSection !== "career" && (
                <button
                  onClick={() =>
                    handleEditInit(
                      "career",
                      profile.careerPreferences || { preferredLocations: [] }
                    )
                  }
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <EditIcon />
                </button>
              )} */}
            </div>

            {editingSection === "career" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Current Location
                    </label>
                    <input
                      type="text"
                      name="currentLocation"
                      value={editFormData.currentLocation || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Preferred Locations
                    </label>
                    <input
                      type="text"
                      name="preferredLocations"
                      value={editFormData.preferredLocations?.join(", ") || ""}
                      onChange={handlePrefLocationsChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Preferred Industry
                    </label>
                    <input
                      type="text"
                      name="preferredIndustry"
                      value={editFormData.preferredIndustry || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Role Category
                    </label>
                    <input
                      type="text"
                      name="roleCategory"
                      value={editFormData.roleCategory || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Employment Type
                    </label>
                    <select
                      name="desiredEmploymentType"
                      value={editFormData.desiredEmploymentType || "Permanent"}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Permanent">Permanent</option>
                      <option value="Contractual">Contractual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Job Style
                    </label>
                    <select
                      name="desiredJobType"
                      value={editFormData.desiredJobType || "Full-time"}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Work from home">Work from home</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                    Profile Summary
                  </label>
                  <textarea
                    name="profileSummary"
                    value={editFormData.profileSummary || ""}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveSectionChanges("career")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#817AEB] hover:bg-indigo-700 rounded-lg shadow transition"
                  >
                    Save Section
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Current City
                    </span>
                    <span className="font-semibold text-slate-800">
                      {profile.careerPreferences?.currentLocation}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Preferred Job Locations
                    </span>
                    <span className="font-medium text-slate-700">
                      {profile.careerPreferences?.preferredLocations?.join(
                        ", "
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Target Industry
                    </span>
                    <span className="font-medium text-slate-700">
                      {profile.careerPreferences?.preferredIndustry}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Target Role Category
                    </span>
                    <span className="font-medium text-slate-700">
                      {profile.careerPreferences?.roleCategory}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                      Employment Type Style
                    </span>
                    <span className="font-medium text-slate-700">
                      {profile.careerPreferences?.desiredEmploymentType} /{" "}
                      {profile.careerPreferences?.desiredJobType}
                    </span>
                  </div>
                </div>


                <div className="border-t border-slate-100 pt-4">
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Professional Profile Summary
                  </span>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {profile.careerPreferences?.profileSummary}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 5: PERSONAL DETAILS */}
          <section
            id="personal-sec"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm transition-all"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Personal Details & Contacts
                </h3>
              </div>
              {/* {editingSection !== "personal" && (
                <button
                  onClick={() =>
                    handleEditInit("personal", profile.personalDetails || {})
                  }
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                >
                  <EditIcon />
                </button>
              )} */}
            </div>

            {editingSection === "personal" ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={editFormData.gender || "Male"}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={editFormData.permanentAddress || ""}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                      Social Linkedin URL
                    </label>
                    <input
                      type="text"
                      name="linkedinProfile"
                      value={editFormData.linkedinProfile || ""}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveSectionChanges("personal")}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#817AEB] hover:bg-indigo-700 rounded-lg shadow transition"
                  >
                    Save Section
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Date of Birth
                  </span>
                  <span className="font-semibold text-slate-800">
                    {profile.personalDetails?.dateOfBirth}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Gender
                  </span>
                  <span className="font-semibold text-slate-800">
                    {profile.personalDetails?.gender}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-0.5">
                    Permanent Address
                  </span>
                  <span className="font-medium text-slate-700">
                    {profile.personalDetails?.permanentAddress}
                  </span>
                </div>

                <div className="md:col-span-2 border-t border-slate-100 pt-4">
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Languages Proficiency matrix
                  </span>
                  <div className="flex flex-wrap gap-4 mt-1">
                    {profile.personalDetails?.languagesKnown &&
                      Object.entries(
                        profile.personalDetails.languagesKnown
                      ).map(([lang, prof]) => (
                        <div
                          key={lang}
                          className="bg-slate-50 border border-slate-150/80 px-3 py-1.5 rounded-lg flex items-center gap-2"
                        >
                          <span className="font-bold text-slate-800 text-xs">
                            {lang}:
                          </span>
                          <span className="text-slate-500 text-xs font-medium">
                            {prof}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* <div className="md:col-span-2 border-t border-slate-100 pt-4">
                  <span className="text-slate-400 block text-xs font-semibold uppercase tracking-wider mb-1">
                    LinkedIn Social Profile
                  </span>
                  <a
                    href={profile.personalDetails?.linkedinProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline hover:text-indigo-700 font-semibold inline-block truncate max-w-full"
                  >
                    {profile.personalDetails?.linkedinProfile}
                  </a>
                </div> */}
              </div>
            )}
          </section>

          {/* SECTION 6: DOCUMENTS ATTACHMENTS */}

        </div>
      </main>
    </div>
  )
}
