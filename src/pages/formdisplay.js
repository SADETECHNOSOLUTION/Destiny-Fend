import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import Basicdetails from "../components/basicdetailsform";
import Experience from "../components/experience";
import Social from "../components/socials";

const  FormDisplay = ()=>{
    const role = useSelector((state)=>state.roleform.role)
      const steps = [
    { id: 1, label: "Basic Info", icon: "mdi:account-outline" },
    { id: 2, label: "Experience", icon: "mdi:briefcase-outline" },
    { id: 3, label: "Portfolio", icon: "mdi:link-variant" },
  ];
  const [currentStep,setCurrentStep] = useState(1)
  const nextStep = ()=>{
    setCurrentStep(currentStep+1)
  }
    const prevStep = ()=>{
    setCurrentStep(currentStep-1)
  }
    return(
       <div className="max-w-[30rem]  bg-white flex flex-col items-center justify-center px-4">
                      <div className="w-full top-0 sticky z-50">
                        <h2 className="text-lg font-semibold mt-4 text-gray-800 mb-3 text-center">
          Story/Scriptwriter
        </h2>
      <div className="flex items-center bg-blackjustify-between relative mb-4">

        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0"></div>
        <div
          className="absolute top-5 left-0 h-1 bg-cta z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center z-10 flex-1">

            {/* Icon Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
              ${
                currentStep >= step.id
                  ? "bg-cta border-cta text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              <Icon icon={step.icon} width="20" />
            </div>

            {/* Label */}
            {/* <p
              className={`text-sm mt-2 text-center
              ${
                currentStep >= step.id
                  ? "text-cta font-medium"
                  : "text-gray-400"
              }`}w2--p[]
            >
              {step.label}
            </p> */}
          </div>
        ))}
      </div>
    </div>
      <div className=" bg-white w-full shadow-lg rounded-2xl p-4">

 {currentStep === 1 && <Basicdetails prevStep={prevStep} nextStep={nextStep} />}
 {currentStep === 2 && <Experience prevStep={prevStep} nextStep={nextStep} />}
  {currentStep === 3 && <Social prevStep={prevStep} nextStep={nextStep} />}
      </div>
      
    </div>
    )
}

export default FormDisplay;
