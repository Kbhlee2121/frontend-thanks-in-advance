import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  CardLink,
} from "reactstrap";

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});

  const getUser = () => {
    const currentUser = location.state.user;
    console.log(currentUser);
    setUserProfile(currentUser);
  };

  useEffect(() => getUser(), []);

  const handleFieldChange = (e) => {
    let { name, value } = e.target;
    const updatedUser = { ...userProfile, [name]: value };
    setUserProfile(updatedUser);
  };

  const updateProfile = () => {
    const user = userProfile;
    axios
      .put(`http://localhost:8000/api/user-update/${user.id}/`, user)
      .then((response) => {
        const updatedUser = response.data;
        setUserProfile(updatedUser);
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
        console.log("finished updating localstorage");
      })
      //runs after all other tasks
      .finally(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardBody>
          <CardTitle tag="h5">Edit Profile</CardTitle>
          <Form>
            <FormGroup>
              <Label for="full_name">Full Name</Label>
              <Input
                // type="text"
                name="full_name"
                id="full_name"
                onChange={handleFieldChange}
                value={userProfile.full_name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="pronouns">Pronouns</Label>
              <Input
                // type="text"
                name="pronouns"
                id="pronouns"
                onChange={handleFieldChange}
                value={userProfile.pronouns}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phonetics">Phonetics</Label>
              <Input
                // type="text"
                name="phonetics"
                id="phonetics"
                onChange={handleFieldChange}
                value={userProfile.phonetics}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_color">Favorite Color</Label>
              <Input
                // type="text"
                name="fav_color"
                id="fav_color"
                onChange={handleFieldChange}
                value={userProfile.fav_color}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_color_to_wear">Favorite Color to Wear</Label>
              <Input
                // type="text"
                name="fav_color_to_wear"
                id="fav_color_to_wear"
                onChange={handleFieldChange}
                value={userProfile.fav_color_to_wear}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_food_snack">Favorite Food/Snack</Label>
              <Input
                // type="text"
                name="fav_food_snack"
                id="fav_food_snack"
                onChange={handleFieldChange}
                value={userProfile.fav_food_snack}
              />
            </FormGroup>
            <FormGroup>
              <Label for="shoe_size">Shoe Size</Label>
              <Input
                // type="text"
                name="shoe_size"
                id="shoe_size"
                onChange={handleFieldChange}
                value={userProfile.shoe_size}
              />
            </FormGroup>
            <FormGroup>
              <Label for="clothes_top_size">Clothes Size (Top)</Label>
              <Input
                // type="text"
                name="clothes_top_size"
                id="clothes_top_size"
                onChange={handleFieldChange}
                value={userProfile.clothes_top_size}
              />
            </FormGroup>
            <FormGroup>
              <Label for="clothes_bottom_size">Clothes Size (Bottom)</Label>
              <Input
                // type="text"
                name="clothes_bottom_size"
                id="clothes_bottom_size"
                onChange={handleFieldChange}
                value={userProfile.clothes_bottom_size}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dont_want_list">Don't Want Items</Label>
              <Input
                // type="text"
                name="dont_want_list"
                id="dont_want_list"
                onChange={handleFieldChange}
                value={userProfile.dont_want_list}
              />
            </FormGroup>
            <FormGroup>
              <Label for="pinterest_link">Pinterest Hook</Label>
              <Input
                // type="text"
                name="pinterest_link"
                id="pinterest_link"
                onChange={handleFieldChange}
                value={userProfile.pinterest_link}
              />
            </FormGroup>
            <FormGroup>
              <Label for="amazon_link">Amazon Shopping List Link</Label>
              <Input
                // type="text"
                name="amazon_link"
                id="amazon_link"
                onChange={handleFieldChange}
                value={userProfile.amazon_link}
              />

              {/* <CardLink alt="Amazon Shopping List Link" href={user.amazon_link}>
                Amazon Shopping List Link
              </CardLink> */}
            </FormGroup>
          </Form>
          <Button color="primary" outline onClick={updateProfile}>
            Save
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserForm;
