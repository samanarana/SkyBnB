// frontend/src/components/ManageSpots/UpdateSpot.js

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSpotThunk } from '../../store/spot';
import './UpdateSpot.css';

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [errors, setErrors] = useState({});
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');


    const spot = useSelector((state) => state.spot.userSpots.find((s) => s.id === Number(spotId)));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (spot) {
          console.log("Spot Data:", spot);
          setCountry(spot.country);
          setAddress(spot.address);
          setCity(spot.city);
          setState(spot.state);
          setDescription(spot.description);
          setTitle(spot.name);
          setPrice(spot.price);
          setPreviewImage(spot.previewImage);
          setLatitude(spot.lat);
          setLongitude(spot.lng);

          const images = spot.spotImages || [];

          if (images.length > 0) setImage1(images[0].url);
          if (images.length > 1) setImage2(images[1].url);
          if (images.length > 2) setImage3(images[2].url);
          if (images.length > 3) setImage4(images[3].url);

        }
      }, [spot]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formErrors = {};

      if (!country) formErrors.country = "Country is required";
      if (!address) formErrors.address = "Address is required";
      if (!city) formErrors.city = "City is required";
      if (!state) formErrors.state = "State is required";
      if (!description || description.length < 30) formErrors.description = "Description is required and should be at least 30 characters";
      if (!title) formErrors.title = "Name is required";
      if (!price) formErrors.price = "Price is required";

      if (!previewImage) {
        formErrors.previewImage = "Preview image is required";
      } else if (!/\.(jpg|jpeg|png)$/.test(previewImage)) {
        formErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
      }

      // Additional validations for each image URL
      if (image1 && !/\.(jpg|jpeg|png)$/.test(image1)) {
        formErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (image2 && !/\.(jpg|jpeg|png)$/.test(image2)) {
        formErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (image3 && !/\.(jpg|jpeg|png)$/.test(image3)) {
        formErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (image4 && !/\.(jpg|jpeg|png)$/.test(image4)) {
        formErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
      }

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      const updatedSpotData = {
        country,
        address,
        city,
        state,
        description,
        name: title,
        price,
        previewImage,
        image1,
        image2,
        image3,
        image4,
        lat: latitude ? latitude : null,
        lng: longitude ? longitude : null,
        userId: user.id,
        };

        const updatedSpot = await dispatch(updateSpotThunk(spotId, updatedSpotData));

      if (updatedSpot) {
        history.push(`/spots/${spotId}`);
      }
    };

    return (
        <div>
          <form onSubmit={handleSubmit} className="update-spot-form-page">
          <h1 className="update-spot-heading">Update a Spot</h1>
            {/* Validation Errors */}
            {Object.keys(errors).length > 0 && (
                <ul>
                    {Object.values(errors).map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}

            {/* First Section */}
            <div className="form-section">
              <h2>Where's your place located?</h2>
              <p>Guests will only get your exact address once they book a reservation.</p>

              <div className="input-container">
                <label htmlFor="country">Country
                {errors.country && <span className="error">{errors.country}</span>}
                </label>
                <input id="country"
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)} />
              </div>

              <div className="input-container">
                <label htmlFor="address">Street Address
                {errors.address && <span className="error">{errors.address}</span>}
                </label>
                <input id="address"
                      type="text"
                      placeholder="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)} />
              </div>


              <div className="city-state-row">
              <div className="input-container" style={{ width: "60%" }}>
                <label htmlFor="city">City {errors.city && <span className="error">{errors.city}</span>}</label>
                <input id="city" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <span className="comma">,</span>

              <div className="input-container" style={{ width: "40%" }}>
                <label htmlFor="state">State {errors.state && <span className="error">{errors.state}</span>}</label>
                <input id="state" type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
            </div>

            <div className="lat-long-row">
              <div className="input-container">
                <label htmlFor="latitude">Latitude {errors.latitude && <span className="error">{errors.latitude}</span>}</label>
                <input id="latitude" type="text" placeholder="Latitude (Optional)" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              </div>

              <span className="comma">,</span>

              <div className="input-container">
                <label htmlFor="longitude">Longitude {errors.longitude && <span className="error">{errors.longitude}</span>}</label>
                <input id="longitude" type="text" placeholder="Longitude (Optional)" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
              </div>
            </div>
          </div>

            <hr></hr>

            {/* Second Section */}
            <div className="form-section">
              <h2>Describe your place to guests</h2>
              <p>Mention the best features of your space, any special amenities like
                fast wifi or parking, and what you love about the neighborhood.
              </p>
                <textarea
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <span className="error">{errors.description}</span>}
            </div>

            <hr></hr>
            {/* Third Section */}
            <div className="form-section">
              <h2>Create a title for your spot</h2>
              <p>Catch guests' attention with a spot title that highlights what makes
                your place special.
              </p>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Name of your spot"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <span className="error">{errors.title}</span>}
              </div>
            </div>
            <hr></hr>
            {/* Fourth Section */}
            <div className="form-section">
              <h2>Set a base price for your spot</h2>
              <p>Competitive pricing can help your listing stand out and rank
                higher in search results.
              </p>
              <div className="price-input-wrapper">
              <div className="input-and-error-container">
                <div className="input-container2">
                  <span className="dollar-sign">$</span>
                  <input
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {errors.price && <span className="input-error">{errors.price}</span>}
              </div>
            </div>
            </div>

            <hr></hr>

            {/* Fifth Section */}
            <div className="form-section">
              <h2>Liven up your spot with photos</h2>
              <p>Submit a link to at least one photo to publish your spot.</p>
              <div className="input-and-error-container-pics">
                <input
                  type="text"
                  placeholder="Preview Image URL"
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                />
                {errors.previewImage && <span className="error-preview">{errors.previewImage}</span>}

                <input
                  type="text"
                  placeholder="Image URL"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                />
                {errors.image1 && <span className="error-preview">{errors.image1}</span>}

                <input
                  type="text"
                  placeholder="Image URL"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                />
                {errors.image2 && <span className="error-preview">{errors.image2}</span>}

                <input
                  type="text"
                  placeholder="Image URL"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                />
                {errors.image3 && <span className="error-preview">{errors.image3}</span>}

                <input
                  type="text"
                  placeholder="Image URL"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                />
                {errors.image4 && <span className="error-preview">{errors.image4}</span>}
              </div>
            </div>

            <hr></hr>

            <button type="submit" className="submit-spot-button">Update Spot</button>
          </form>
        </div>
      );
    };

  export default UpdateSpot;
