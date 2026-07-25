import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";

const Followers = () => {
  const { userID } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const [followers, setFollowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  // Fetch followers from the API 
  const fetchFollowers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch(
        `https://destiny-apigateway.onrender.com/follows/api/followers/${userID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFollowers(data);
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userID]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);


  // Filter followers based on the search input
  const filteredFollowers = followers?.users?.filter((follower) =>
    follower.name.toLowerCase().includes(searchTerm.toLowerCase())
 // Case insensitive search
  );


  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-5/6 shadow-lg flex p-2 flex-col gap-4">
        <div className="flex items-center justify-between gap-2 text-lg font-semibold px-8">
          <div className="flex items-center gap-1">
            <p>Followers</p>
            <span>({followers?.count})</span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm} // Bind the input value to the state
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
              className="w-[220px] h-11 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-green"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-2 text-gray-400 rounded-r-md focus:outline-none"
            >
              <Icon
                icon="ooui:search"
                width="1.2em"
                height="1.2em"
                className="text-gray-400"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredFollowers?.map((follower) => (
            <div
              key={follower.id}
              className="flex w-[48rem] shadow-md justify-between py-2 px-8 items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-16 h-16 bg-gray-300 rounded-full"
                  src={`https://destiny-apigateway.onrender.com${follower.profileImagePath}`}
                  alt=""
                />
                <p className="text-lg w-24 truncate">{follower.name}</p>
              </div>
              <span>{follower.work}</span>
              {follower.id !== userId ? (
                <span>{follower.mutual} Mutuals</span>
              ) : null}
            </div>
          ))}
          <div>
            <span>
              <p></p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
