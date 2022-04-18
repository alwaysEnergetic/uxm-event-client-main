import { useEffect, useState, useRef } from 'react'
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useForm, Controller, Control } from "react-hook-form";
import ReactSelect from "react-select";
import classnames from 'classnames'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gqlParseError, gqlErrorFirstMessage } from "@muft/dailyfns"
import {objGetPath} from "@muft/dailyfns"
import { TImage, TUser, IAttribute } from "src/lib/types"
import { getGqlClient } from "src/lib/gqlClient"
import UploadPreviewImage from 'src/components/organisms/Upload/UploadPreviewImage'
import { Loading, LoadingElement } from "src/components/shared/Loading";
import Layout from 'src/components/templates/Layout'
import ProfileLayoutEdit from 'src/components/ProfileLayoutEdit/ProfileLayoutEdit'
import AddItemToWebshop from 'src/components/Profile/AddItemToWebshop'
import styles from 'src/styles/Profile.module.scss'
import { queryUserProfile, mutationUserEdit } from 'src/lib/graphql/schema/connect'

import { ProtectRoute } from 'src/components/organisms/Auth/AuthContext'

const EditProfile: NextPage = () => {
  const loadingEl = useRef<LoadingElement>(null);
  const [user, setUser] = useState<TUser>()
  const [genres, setGenres] = useState<IAttribute[]>()
  const [categories, setCategories] = useState<IAttribute[]>()
  const [countries, setCountries] = useState<IAttribute[]>()
  
  const { register, handleSubmit, watch, formState: { errors }, reset, control, setValue } = useForm({
    // defaultValues: user
  });
  register("profileImageId")
  register("coverImageId")

  const fetchInitialData = async () => {
    loadingEl.current?.show();
    getGqlClient().request(queryUserProfile)
    .then((res) => {
      // console.log(res)
      setUser(res.user)
      setGenres(res.genres)
      setCategories(res.categories)
      setCountries(res.countries)
      reset(res.user)
    })
    .catch((err) => {
      const msg = gqlErrorFirstMessage(err, {
        capitalize: true
      })
      toast.error(msg);
    })
    .finally(() => {
      loadingEl.current && loadingEl.current.hide();
    });
  }

  const onSubmit = (data: TUser) => {
    // console.log(data)
    const variables = {
      countryId: data.countryId,
      categoryIds: data.categoryIds,
      networkIds: data.networkIds,
      genreIds: data.genreIds,
      firstName: data.firstName,
      lastName: data.lastName,
      tagline: data.tagline,
      tagline2: data.tagline2,
      bandName: data.bandName,
      businessName: data.businessName,
      bio: data.bio,
      profileImageId: data.profileImageId,
      coverImageId: data.coverImageId,
    }

    loadingEl.current?.show();
    getGqlClient().request(mutationUserEdit, {input: variables})
    .then((res) => {
      // console.log(res)
      // setUser(res.user)
      // reset(res.user)
    })
    .catch((err) => {
      const errObj = gqlParseError(err);
      const msg = gqlErrorFirstMessage(err, {
        capitalize: true
      })
      // console.log(errObj)
      toast.error(msg);
    })
    .finally(() => {
      loadingEl.current?.hide();
    });
  
    // console.log(JSON.stringify(data, undefined, 2))
  };

  const handleLayoutChange = () => {
    fetchInitialData()
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  return (
    <>
        <ToastContainer />
        <Loading ref={loadingEl} overlay />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <UploadPreviewImage 
                className={classnames('mb-5', styles.coverPhoto)}
                classNamePhoto="h-100"
                crop={{aspect: 3.2/1}}
                image={user?.coverImage}
                // defaultImageUrl={"/images/eventbg.jpg"}
                onComplete={(res) => {
                  const id = objGetPath(res, "0.id")
                  setValue("coverImageId", id)
                }}
                onDelete={() => {
                  setValue("coverImageId", null)
                }}
              />
              <UploadPreviewImage 
                className={styles.profilePhotoCtr}
                classNamePhoto={classnames("ms-3 rounded-circle", styles.profilePhoto, styles.editPage_ProfilePhoto)}
                classImageButton = {styles.uploadProfileImageButton}
                crop={{aspect: 1}}
                image={user?.profileImage} 
                onComplete={(res) => {
                  const id = objGetPath(res, "0.id")
                  setValue("profileImageId", id)
                }}
              />
            </div>
            <div className="col-md-6">
              <ProfileLayoutEdit 
                layouts={user?.userProfileLayouts} 
                onChange={handleLayoutChange}
              />
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)} className={styles.EditForm}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input className="form-control" defaultValue={user?.firstName} {...register("firstName")}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input className="form-control" defaultValue={user?.lastName} {...register("lastName")} 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tagline 1</label>
                  <input className="form-control" {...register("tagline")} 
                    placeholder="(optional) Tag line under your name - 150 characters maximum."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tagline 2</label>
                  <input className="form-control" defaultValue={user?.tagline2} {...register("tagline2")} 
                    placeholder="(optional) Enter news here."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Categories</label>
                  <Controller
                    control={control}
                    name={"categories"}
                    render={({ field: {onChange, onBlur, value} }) => {
                      return (
                        <ReactSelect 
                          id="categories"
                          instanceId="categories"
                          value={value} 
                          defaultValue={value} 
                          options={categories} 
                          getOptionLabel ={(option)=>option.name}
                          getOptionValue ={(option)=>option.id}
                          isMulti
                          onChange={(selected) => {
                            // console.log(selected)
                            const ids = selected?.map(({ id }) => id);
                            setValue('categoryIds', ids)
                            onChange(selected);
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Networks With</label>
                  <Controller
                    control={control}
                    name={"networks"}
                    render={({ field: {onChange, onBlur, value} }) => {
                      return (
                        <ReactSelect 
                          id="networks"
                          instanceId="networks"
                          value={value} 
                          defaultValue={value} 
                          options={categories} 
                          getOptionLabel ={(option)=>option.name}
                          getOptionValue ={(option)=>option.id}
                          isMulti
                          onChange={(selected) => {
                            // console.log(selected)
                            const ids = selected?.map(({ id }) => id);
                            setValue('networkIds', ids)
                            onChange(selected);
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Band (if applicable)</label>
                  <input className="form-control" defaultValue={user?.bandName} {...register("bandName")} 
                    placeholder="Band (if applicable)"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Company (if applicable)</label>
                  <input className="form-control" defaultValue={user?.businessName} {...register("businessName")} 
                    placeholder="Company (if applicable)"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Genres</label>
                  <Controller
                    control={control}
                    name={"genres"}
                    render={({ field: {onChange, onBlur, value} }) => {
                      return (
                        <ReactSelect 
                          id="generes"
                          instanceId="genres"
                          value={value} 
                          defaultValue={value} 
                          options={genres} 
                          getOptionLabel ={(option)=>option.name}
                          getOptionValue ={(option)=>option.id}
                          isMulti
                          onChange={(selected) => {
                            // console.log(selected)
                            const ids = selected?.map(({ id }) => id);
                            setValue('genreIds', ids)
                            onChange(selected);
                          }}
                        />
                      );
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <Controller
                    control={control}
                    name={"country"}
                    render={({ field: {onChange, onBlur, value} }) => {
                      return (
                        <ReactSelect 
                          id="country"
                          instanceId="country"
                          value={value} 
                          defaultValue={value} 
                          options={countries} 
                          getOptionLabel ={(option)=>option.name}
                          getOptionValue ={(option)=>option.id}
                          onChange={(selected) => {
                            setValue('countryId', selected.id)
                            onChange(selected);
                          }}
                        />
                      );
                    }}
                  />
                  
                </div>
                <div className="mb-3">
                  <label className="form-label">Bio</label>
                  <textarea className="form-control ht-100" defaultValue={user?.bio} {...register("bio")} 
                  ></textarea>
                </div>
                  
                <button type="submit" className="btn btn-primary mt-2">Update Profile</button>
              </form>

              <div className="card mt-5">
                <div className="card-body">
                  <h5 className="card-title">Add Web Shop Items</h5>
                  <AddItemToWebshop title="Click here to add items to your webshop" />
                  {/* <a href="#" className="card-link">Click here to add items to your webshop</a> */}
                </div>
              </div>
            
            </div>
          </div>
        </div>
    </>
  )
}

export default function _EditProfilePage()  {
  return (
    <Layout>
      <ProtectRoute>
        <EditProfile />
      </ProtectRoute>
    </Layout>
  )
}