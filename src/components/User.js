import React from "react";
import { useNavigate } from "react-router-dom";
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

const User = ({ user }) => {
  const navigate = useNavigate();
  const editProfile = () => {
    navigate("/userform", { state: { user: user } });
  };
  return (
    <div>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardBody>
          <CardTitle tag="h5" className="text-center">
            - User Profile -
          </CardTitle>
          <Button color="primary" outline onClick={editProfile}>
            Edit Profile
          </Button>
          <Form className="mt-2">
            <FormGroup>
              <Label for="full_name">Full Name</Label>
              <Input
                // type="text"
                name="full_name"
                id="full_name"
                // onChange={addInputHandler}
                value={user.full_name}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="pronouns">Pronouns</Label>
              <Input
                // type="text"
                name="pronouns"
                id="pronouns"
                // onChange={addInputHandler}
                value={user.pronouns}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="phonetics">Phonetics</Label>
              <Input
                // type="text"
                name="phonetics"
                id="phonetics"
                // onChange={addInputHandler}
                value={user.phonetics}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_color">Favorite Color</Label>
              <Input
                // type="text"
                name="fav_color"
                id="fav_color"
                // onChange={addInputHandler}
                value={user.fav_color}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_color_to_wear">Favorite Color to Wear</Label>
              <Input
                // type="text"
                name="fav_color_to_wear"
                id="fav_color_to_wear"
                // onChange={addInputHandler}
                value={user.fav_color_to_wear}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="fav_food_snack">Favorite Food/Snack</Label>
              <Input
                // type="text"
                name="fav_food_snack"
                id="fav_food_snack"
                // onChange={addInputHandler}
                value={user.fav_food_snack}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="shoe_size">Shoe Size</Label>
              <Input
                // type="text"
                name="shoe_size"
                id="shoe_size"
                // onChange={addInputHandler}
                value={user.shoe_size}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="clothes_top_size">Clothes Size (Top)</Label>
              <Input
                // type="text"
                name="clothes_top_size"
                id="clothes_top_size"
                // onChange={addInputHandler}
                value={user.clothes_top_size}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="clothes_bottom_size">Clothes Size (Bottom)</Label>
              <Input
                // type="text"
                name="clothes_bottom_size"
                id="clothes_bottom_size"
                // onChange={addInputHandler}
                value={user.clothes_bottom_size}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="dont_want_list">Don't Want Items</Label>
              <Input
                // type="text"
                name="dont_want_list"
                id="dont_want_list"
                // onChange={addInputHandler}
                value={user.dont_want_list}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="pinterest_link">Pinterest Hook</Label>
              <Input
                // type="text"
                name="pinterest_link"
                id="pinterest_link"
                // onChange={addInputHandler}
                value={user.pinterest_link}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="amazon_link">Amazon Shopping List Link</Label> */}
              {/* <Input
                // type="text"
                name="amazon_link"
                id="amazon_link"
                // onChange={addInputHandler}
                value={user.amazon_link}
              /> */}
              <CardLink alt="Amazon Shopping List Link" href={user.amazon_link}>
                Amazon Shopping List Link
              </CardLink>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default User;
