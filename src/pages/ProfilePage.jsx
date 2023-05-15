import axios from "axios";
import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/userData.context";
import { AuthContext } from "../context/auth.context";
import API_URL from "../services/apiConfig";
import { Link, useParams } from "react-router-dom";

// Custom components
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileBio from "../components/Profile/ProfileBio";
import ProfilePicture from "../components/Profile/ProfilePicture";
import CollectionCard from "../components/Collections/CollectionCard";
import SectionHeader from "../components/UI/SectionHeader";

// MUI components
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

// ----- End of imports

// const API_URL = "http://localhost:5005";

// Fetch user object from username in URL
const ProfilePage = () => {
  const { username } = useParams();
  const { userData, setUserData } = useContext(UserDataContext);
  const { user } = useContext(AuthContext);

  console.log(username);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_URL}/users/${username}`);
      setUserData(response.data);
    };

    fetchData();
  }, [username, setUserData]);

  // RENDER PROFILE PAGE
  return (
    // Profile header
    <div id="profile" className="mx-4 mt-4 shadow-sm">
      <div className="relative">
        <ProfileHeader />
        <div className="absolute mt-[-80px] mx-4">
          <ProfilePicture />
        </div>
      </div>

      <div>
        <ProfileBio />
      </div>

      {/* Profile body */}
      <section className="px-4 pt-3 pb-20 bg-slate-200">
        <SectionHeader title="Popular Collections" />

        {/* Render available collections */}
        <Grid container spacing={3}>
          {userData.collections && userData.collections ? (
            userData.collections.map((collection) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={collection._id}>
                <CollectionCard key={collection._id} collection={collection} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <p>No collections available</p>
            </Grid>
          )}
        </Grid>

        {/* Create new collection button */}
        {user && user.username === userData.username ? (
          <nav className="my-4">
            <Link to="/create-collection" className="m-2">
              <Button variant="contained">New collection</Button>
            </Link>
          </nav>
        ) : (
          <div></div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
