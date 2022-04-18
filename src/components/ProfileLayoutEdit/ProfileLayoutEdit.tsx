import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

import { gqlErrorFirstMessage } from "@muft/dailyfns"
import {objGetPath} from "@muft/dailyfns";
import { getGqlClient } from "src/lib/gqlClient";
import {
  TUserProfileLayoutView,
  TUserLink,
  TImage,
  TUser,
  IAttribute,
} from "src/lib/types";
import {
  mutationUserProfileLayoutCreate,
  mutationUserProfileLayoutUpdate,
  mutationUserProfileLayoutDelete,
} from "src/lib/graphql/schema/connect";

import { Loading, LoadingElement } from "src/components/shared/Loading";
import ProfileLayouts from "src/components/ProfileLayoutEdit/ProfileLayouts";
import { UploadResponse } from "src/components/organisms/Upload/Upload";
import UploadImageModal from "./UploadImageModal";
import AddTrackFormModal from "./AddTrackFormModal";
import RadioSongSubmission from "./RadioSongSubmission";
import ButtonModal from "src/components/shared/ButtonModal";

type ProfileLayoutEditProps = {
  layouts?: TUserProfileLayoutView[];
  onChange?: (res: UploadResponse, file?: File) => void;
};

const ProfileLayoutEdit = (props: ProfileLayoutEditProps) => {
  const { layouts, onChange } = props;
  const router = useRouter();
  // const [isEdit, setIsEdit] = useState(false)
  // const [layout, setLayout] = useState<TUserProfileLayoutView | null>(null)

  const loadingEl = useRef<LoadingElement>(null);

  const saveLayout = (data) => {
    // console.log(data)

    loadingEl.current?.show();
    getGqlClient()
      .request(mutationUserProfileLayoutCreate, { input: data })
      .then((res) => {
        // console.log(res)
        typeof onChange == "function" && onChange(res);
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        // console.log(errObj)
        toast.error(msg);
      })
      .finally(() => {
        loadingEl.current?.hide();
      });
  };


  const deleteLayout = (id) => {
    // console.log(id)
    if (!id) return;
    loadingEl.current?.show();
    getGqlClient()
      .request(mutationUserProfileLayoutDelete, { id: id })
      .then((res) => {
        // console.log(res)
        typeof onChange == "function" && onChange(res);
      })
      .catch((err) => {
        const msg = gqlErrorFirstMessage(err, {
          capitalize: true,
        });
        // console.log(errObj)
        toast.error(msg);
      })
      .finally(() => {
        loadingEl.current?.hide();
      });
  };

  // DND - I will complete it later
  // const onEditHandle = (layout: TUserProfileLayoutView) => {
  //   console.log(layout)
  //   setIsEdit(true)
  //   setLayout(layout)
  // }

  return (
    <div>
        <ToastContainer />
        <Loading ref={loadingEl} overlay />
        <div className="py-5">
          <div className="d-flex border bg-white rounded-1 p-2 me-3 mb-3">
            <UploadImageModal
              onComplete={(res) => {
                const id = objGetPath(res, "0.id");
                console.log("imageid", id);
                saveLayout({
                  ref: "image",
                  value: id,
                });
              }}
            />

            <AddTrackFormModal
              onChange={(res) => {
                saveLayout({
                  ref: "user_link",
                  value: res.id,
                });
              }}
            />

            <RadioSongSubmission />
          </div>

          <ProfileLayouts
            layouts={layouts}
            // onEditHandle={onEditHandle}
            onDelete={(id) => deleteLayout(id)}
            editable={true}
          />
        </div>
    </div>
  );
};

export default ProfileLayoutEdit;
