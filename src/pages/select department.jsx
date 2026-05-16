import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDepartment } from "../slices/departmentslice";
import Navbar from "../components/navbar";

const department = [
  { id: 1, name: "Story/Script Writing" },
  { id: 2, name: "Director" },
  { id: 3, name: "Production" },
  { id: 4, name: "Cinematography" },
  { id: 5, name: "Editing" },
  { id: 6, name: "Sound Recording" },
  { id: 7, name: "Dubbing" },
  { id: 8, name: "Music Direction" },
  { id: 9, name: "Lyrics Writing" },
  { id: 10, name: "Playback Singing" },
  { id: 11, name: "Choreography" },
  { id: 12, name: "Stunt Direction" },
  { id: 13, name: "Costume Designing" },
  { id: 14, name: "Makeup & Hairstyling" },
  { id: 15, name: "Subtitles & Dubbing (Localization)" },
  { id: 16, name: "Lighting" },
];

const Department = () => {
  const dispatch = useDispatch();
  const selectedFromRedux = useSelector(
    (state) => state.department.selectedDepartment
  );

  // temporary selection before pressing “Next”
  const [tempSelection, setTempSelection] = useState(selectedFromRedux);

  const handleSelect = (dept) => {
    setTempSelection(dept);
  };

  const handleNext = () => {
    if (tempSelection) {
      dispatch(setDepartment(tempSelection));
      // navigate or perform next action here if needed
      console.log("Saved to Redux:", tempSelection);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen relative flex items-center justify-center">
        <div className="w-1/3 h-1/2 flex flex-col items-center gap-6">
          <span className="text-xl">Select Department (Primary)</span>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {department.map((dept) => {
              const isSelected = tempSelection?.id === dept.id;
              return (
                <div
                  key={dept.id}
                  onClick={() => handleSelect(dept)}
                  className={`py-2 px-3 rounded-lg border-2 cursor-pointer ${
                    isSelected
                      ? "border-cta bg-cta text-white"
                      : "border-cta text-cta"
                  }`}
                >
                  <span>{dept.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {tempSelection && (
          <button
            onClick={handleNext}
            className="px-4 absolute right-48 bottom-20 bg-cta text-white rounded-lg py-2"
          >
            <span>Next</span>
          </button>
        )}
      </div>
    </>
  );
};

export default Department;
