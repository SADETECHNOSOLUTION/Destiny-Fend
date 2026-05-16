import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  FullName: '',
  StageName: '',
  Gender: '',
  Email: '',
  Nationality: '',
  Ethnicity: '',
  MaritalStatus: '',
  LanguagesKnown: '',
  MobileNumber: '',
  Address: '',
  NativeLanguage: '',
  EmergencyContact: '',
  CurrentResidency: '',
  ProfileSummary: '',
  DOB: new Date(),
  Height: '',
  Weight: '',
  BodyType: '',
  HairColor: '',
  HairLength: '',
  EyeColor: '',
  SkinTone: '',
  FacialHair:'',
  Tattoos: '',
  Piercing: '',
  DistinctFeatures: '',
  ShoeSize: '',
  ClothingSize: '',
  Build:'',
  VoiceType:'',
  ActingExperience:null,
  ActingRoles:'',
  Previousprojects: '',
  NotableDirectors: '',
  VocalRange: '',
  Skills: '',
  DanceScenes: '',
  AccentDialects: '',
  AwardsandAchievements: '',
  MethodActingTechniques:[],
  ImprovisationExperience:'',
  OnStageWork: '',
  FightActionScenes: '',
  AvailableDates:'',
  PreferredWorkLocations:'',
  AvailabilityForWorkshops: '',
  WorktypePreferences: [],
  ContractType: '',
  WillingnesstoTravel: '',
  AvailabilityForNightshoots: '',
  LongtermCommitment: '',
  WorksheduleFlexibility: '',
  RoleTypePreference: [],
  Portfolio: [],
  Reference:'',
  SocialMediaReach:'',
  EquipmentPropsOwned:'',
  SpecialRequirements:'',
  MedicalConditions: '',
  CareerGoals:'',
  MembershipsandAffiliations:'',
  socialMediaLinks: {  facebook: '',instagram: '',twitter: '',youtube: ''},
  HobbiesandInterests: [],
  PublicSpeakingExperience: '',
  PersonalTransportationAvailability: '', 
};

const professionformSlice = createSlice({
  name: 'professionform',
  initialState,
  reducers: {
    setFormData(state, action) {
      return { ...state, ...action.payload };
    },
    addToPortfolio(state, action) {
      state.Portfolio.push(action.payload);  // Push the new file to the Portfolio array
    },
    resetFormData(state) {
      return initialState;
  },
  },
});

export const { setFormData,resetFormData,addToPortfolio } = professionformSlice.actions;
export default professionformSlice.reducer;
