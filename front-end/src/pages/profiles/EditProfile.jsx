import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateProfile } from "../../components/redux/slices/profileSlice";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { editProfileSchema } from "../forms/schema";
import { ToastContainer } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile } = useSelector((state) => state.profile);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (profile) {
      setPhoto(profile?.profilePhoto?.url || null);
    }
  }, [profile]);

  const formik = useFormik({
    initialValues: {
      username: profile?.username || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
    },
    validationSchema: editProfileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const obj = { ...values }
      if (photo !== profile.profilePhoto.url) obj.photo = photo;
      dispatch(updateProfile({ ...values, photo }));
    },
  });

  return (
    <>
      <ToastContainer position="top-center" />
      <section className="profile mx-auto my-0 sm:my-[90px] flex flex-col gap-3 items-center py-[30px] px-[30px] rounded-[0] sm:rounded-[24px] w-full sm:w-[500px] md:w-[600px] bg-[#ffffff9e] border-[0] sm:border border-[#EEE]">
        <div className="photo relative w-[100px] md:w-[150px] h-[100px] md:h-[150px] flex items-center rounded-full border-[2px] md:border-[4px] border-solid border-gray">
          <div className="overflow-hidden w-full h-full rounded-full">
            <img
              className="w-full h-full object-cover object-[center_top]"
              src={photo}
              alt="avatar"
            />
          </div>
        </div>
      
        <form action="" className="upload-image">
          <label className="upload-img-label" htmlFor="upload-img">
            Choose a picture
          </label>
          <input
            onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            style={{ display: "none" }}
            id="upload-img"
            type="file"
          />
        </form>
      
        <form
          onSubmit={formik.handleSubmit}
          className="form-div w-full flex flex-col gap-5"
        >
          <div className="username flex justify-center flex-col gap-2">
            <label
              className="ml-[5px] text-[#333] text-[16px]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              placeholder="Enter your username"
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            <span className="error">
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null}
            </span>
          </div>
      
          <div className="email flex justify-center flex-col gap-2">
            <label className="ml-[5px] text-[#333] text-[16px]" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Enter your email"
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <span className="error">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null}
            </span>
          </div>
      
          <div className="bio flex justify-center flex-col gap-2">
            <label className="ml-[5px] text-[#333] text-[16px]" htmlFor="bio">
              Bio
            </label>
            <input
              placeholder="Enter your bio"
              type="text"
              id="bio"
              name="bio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
            />
            <span className="error">
              {formik.touched.bio && formik.errors.bio ? formik.errors.bio : null}
            </span>
          </div>
      
          <button
            type="submit"
            className="form-btn flex items-center justify-center gap-3 mt-[20px] !mb-0"
          >
            <i className="bi bi-person"></i>
            Update profile
          </button>
        </form>
      </section>
    </>
  );
};

export default EditProfile;
