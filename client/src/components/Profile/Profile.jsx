import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./Profile.css";
import { toast, Slide } from "react-toastify";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [attendance, setAttendance] = useState([]);
  const [phoneError, setPhoneError] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    rollNo: "",
    phoneNo: "",
    email: "",
    year: "",
    batch: "",
    department: "",
    profilepic: "",
    userId: "",
    projects: [],
  });
  const [profilephoto, setProfilephoto] = useState("");
  // const [pp,setPp] = useState("")
  // useEffect(()=>{
  //   setPp(`${import.meta.env.VITE_BACK_URL}/${profileData.profilepic}?t=${Date.now()}`)
  // },[])

  const projectData = profileData?.projects || [];
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/auth/get-profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setProfileData(data);
          setProfilephoto(data.profilepic);
        } else {
          console.error("Server error:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to fetch students. Please try again!", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    };

    fetchStudents();
  }, [profilephoto]);
  const handleEditDetails = () => {
    setIsPopupVisible(true); // Show the popup
  };
  useEffect(() => {
    if (!profileData?.userId) return; // Exit if userId is not available

    const fetchAttend = async () => {
      try {
        const id = profileData.userId;
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/attendance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          setAttendance(data[0].attendance);
          // console.log("attendance, array", data[0].attendance);
        } else {
          console.error("Server error:", data.message);
        }
      } catch (error) {
        // console.error("Failed to fetch students:", error);
        // toast.error("Failed to fetch students. Please try again!", {
        //   position: "top-right",
        //   theme: "dark",
        //   transition: Slide,
        //   autoClose: 1000,
        // });
      }
    };

    fetchAttend();
  }, [profileData]);
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };

  if (!profileData) {
    return (
      <div className="profile-loader">
        <p>Loading profile data...</p>
      </div>
    );
  }
 const handSaveEditDetails = async () => {
  try {
    const updatedProfileData = {
      name: document.querySelector('input[type="text"]').value,
      phoneNo: document.querySelector('input[type="tel"]').value,
    };

    console.log("Selected File:", selectedFile ? selectedFile.name : "No file selected");
    // Update Profile Details First
    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/auth/update-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileData),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error("Error updating profile: " + data.message, {
        position: "top-right",
        theme: "light",
        transition: Slide,
        autoClose: 1000,
      });
      return;
    }

    // If profile details updated successfully, show success message
    toast.success("Profile updated successfully!", {
      position: "top-right",
      theme: "light",
      transition: Slide,
      autoClose: 1000,
    });
    if (!selectedFile) {
      console.error("No file selected");
      return;
  }

    // If a new profile picture is selected, upload it separately
    if (selectedFile) {
      console.log("Uploading new profile picture...");
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      console.log("Form Data Content:", formData.get("profilePicture"));
      console.log("Form Data:", formData);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response1 = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/upload`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data1 = await response1.json();
      console.log(data1.filePath);

      if (response1.ok) {
        console.log("Profile picture uploaded successfully:", data1.filePath);
        setProfileData((prev) => ({
          ...prev,
          profilepic: data1.filePath, // Ensure this matches your backend response
        }));
        toast.success("Profile picture updated!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
      } else {
        console.error("Error updating profile picture:", data1.message);
        toast.error("Error updating profile picture: " + data1.message, {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
      }
    }

    // Fetch updated profile data
    const fetchUpdatedProfile = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/get-profile`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const updatedData = await response.json();
      if (response.ok) setProfileData(updatedData);
    };

    await fetchUpdatedProfile();

  } catch (error) {
    toast.error("An error occurred while saving your profile.", {
      position: "top-right",
      theme: "light",
      transition: Slide,
      autoClose: 1000,
    });
  }
};

  const validatePhoneNumber = (phone) => {
    return phone === "" || /^[0-9]{10}$/.test(phone);
  };
  return (
    <div className="profile-page-container">
      <div className="profile-page-card">
        <div className="profile-page-left-column">
          <header className="profile-page-header">
            <div className="profile-page-photo-container">
              <img
                src={profileData.profilepic}
                alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                className="profile-page-photo"
                onError={(e) => {
                  e.target.src =
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
                }}
              />
            </div>
            <div className="profile-page-header-text">
              <h1>{profileData.name.toLocaleLowerCase()}</h1>
              <p className="profile-page-roll-no">
                Roll No: {profileData.rollNo}
              </p>
            </div>
          </header>

          {/* <div className="profile-page-details">
            <div className="profile-page-detail-row">
              <label>Name:</label>
              <p>{profileData.name.toUpperCase()}</p>
            </div>
            {profileData.phoneNo &&
              profileData.phoneNo !== "0" &&
              profileData.phoneNo !== 0 && (
                <div className="profile-page-detail-row">
                  <label>Phone:</label>
                  <p>{profileData.phoneNo}</p>
                </div>
              )}

            <div className="profile-page-detail-row">
              <label>Email:</label>
              <p>{profileData.email}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Year:</label>
              <p>{profileData.year}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Batch:</label>
              <p>{profileData.batch}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Department:</label>
              <p>{profileData.department}</p>
            </div>
          </div> */}
          <div className="profile-page-details">
            <div className="profile-page-detail-row">
              <div className="profile-page-detail-left">
                <label>Name:</label>
                <p>{profileData.name.toUpperCase()}</p>
              </div>
              {profileData.phoneNo &&
                profileData.phoneNo !== "0" &&
                profileData.phoneNo !== 0 && (
                  <div className="profile-page-detail-right">
                    <label>Phone:</label>
                    <p>{profileData.phoneNo}</p>
                  </div>
                )}
            </div>

            <div className="profile-page-detail-row">
              <div className="profile-page-detail-left">
                <label>Email:</label>
                <p>{profileData.email}</p>
              </div>
              <div className="profile-page-detail-right">
                <label>Year:</label>
                <p>{profileData.year}</p>
              </div>
            </div>

            <div className="profile-page-detail-row">
              <div className="profile-page-detail-left">
                <label>Batch:</label>
                <p>{profileData.batch}</p>
              </div>
              <div className="profile-page-detail-right">
                <label>Department:</label>
                <p>{profileData.department}</p>
              </div>
            </div>
          </div>

          <div className="profile-page-edit-details-container">
            <button
              className="profile-page-button profile-page-button primary"
              onClick={handleEditDetails}
            >
              Edit Details
            </button>
          </div>
          <div className="profile-page-table-container">
            <table className="profile-page-table">
              <thead>
                <tr>
                  <th>Project</th>
                  {[...Array(6)].map((_, index) => (
                    <th key={index}>{`Session ${index + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Project One", "Project Two"].map((project) => (
                  <tr key={project}>
                    <td>{project}</td>
                    {[...Array(6)].map((_, index) => {
                      const sessionKey = `Session${index + 1}`; // Matches the "sessionNo" format
                      // console.log("Checking:", { project, sessionKey });

                      // Finding a matching attendance record
                      const record = attendance?.find(
                        (entry) =>
                          entry?.projectName?.trim()?.toLowerCase() ===
                            project.trim().toLowerCase() &&
                          entry?.sessionNo?.trim()?.toLowerCase() ===
                            sessionKey.trim().toLowerCase()
                      );

                      return (
                        <td key={sessionKey}>
                          {record
                            ? record.status === "Present"
                              ? "✔"
                              : "❌"
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="profile-page-right-column">
          <div className="profile-page-projects">
            {projectData.slice(0, 2).map((project, index) => (
              <div className="profile-page-project-card" key={index}>
                <img
                  src="https://www.baker.edu/wp-content/uploads/game-developer-degree.jpg"
                  alt={project.title}
                  className="profile-page-project-image"
                />
                <h2>{project.title}</h2>
                <div className="profile-project-data">
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Category: {project.category}
                    </span>
                    <span className="profile-page-project-category">
                      Project No: {project.project}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Deployed:
                      {project.deployed ? (
                        <a
                          href={project.deployed}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      ) : (
                        " NA"
                      )}
                    </span>
                    <span className="profile-page-project-category">
                      isCompleted: {project.iscompleted ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="profile-project-row social-links">
                    <a
                      href={project.github || "#"}
                      target={project.github ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.github ? "disabled-link" : ""}
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.linkedin || "#"}
                      target={project.linkedin ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.linkedin ? "disabled-link" : ""}
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={project.instagram || "#"}
                      target={project.instagram ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.instagram ? "disabled-link" : ""}
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={project.twitter || "#"}
                      target={project.twitter ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.twitter ? "disabled-link" : ""}
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Render "No Project" cards if less than two projects exist */}
            {projectData.length < 2 &&
              Array.from({ length: 2 - projectData.length }).map((_, index) => (
                <div
                  className="profile-page-project-card no-project-card"
                  key={`no-project-${index}`}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
                    alt="No Project"
                    className="profile-page-project-image"
                  />
                  <h2>No Project</h2>
                  <p>No project is available yet.</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Popup Section */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Edit Details</h2>
            <form
              // action={`${import.meta.env.VITE_BACK_URL}/auth/upload`}
              // method="POST"
              encType="multipart/form-data"
              onSubmit={(event) => {
                event.preventDefault();
                if (!validatePhoneNumber(profileData.phoneNo)) {
                  setPhoneError("Phone number must be either empty or 10 digits.");
                  return;
                }
                handSaveEditDetails();
                handleClosePopup();
              }}
            >
              {/* Profile Image Upload with Preview */}
              <div className="popup-form-row">
                <label>Profile Image:</label>
                <div className="profile-image-preview">
                  <img
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : profileData?.profilepic
                        ? `${import.meta.env.VITE_BACK_URL}/${
                            profileData.profilepic
                          }?t=${Date.now()}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                    alt="Preview"
                    className="profile-preview-image"
                    onError={(e) => {
                      e.target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
                    }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  onChange={(event) => {
                    // console.log("File Input Change Event Triggered");
                    const file = event.target.files[0];
                    // console.log("Selected File:", file);

                    if (file) {
                      setSelectedFile(file); // Store the file in state
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setProfileData((prevData) => ({
                          ...prevData,
                          profilepic: reader.result, // For preview
                        }));
                      };
                    }
                  }}
                />
              </div>

              {/* Name */}
              <div className="popup-form-row">
                <label>Name:</label>
                <input type="text" defaultValue={profileData.name} />
              </div>

              {/* Phone Number */}
              <div className="popup-form-row">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={profileData.phoneNo}
            onChange={(e) => {
              setProfileData((prevData) => ({
                ...prevData,
                phoneNo: e.target.value,
              }));
              setPhoneError(""); // Clear error when typing
            }}
            placeholder="Enter 10-digit phone number"
          />
          {phoneError && <p className="error-message">{phoneError}</p>}
        </div>

              {/* Buttons */}
              <div className="popup-buttons">
                <button
                  type="submit"
                  className="save-button"
                  onClick={() => {
                    handleClosePopup();
                    handSaveEditDetails();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
