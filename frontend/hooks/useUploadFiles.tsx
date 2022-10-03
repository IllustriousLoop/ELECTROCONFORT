import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Role } from "../ts/types/auth/authData";
import auth from "./context/auth";

type status = "wait" | "ready" | "uploading";
type useUploadFilesReturn = [status, () => void, { uploadProps: UploadProps }];
type useUploadFilesType = (month: number) => useUploadFilesReturn;

const useUploadFiles: useUploadFilesType = (month) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [status, setStatus] = useState<status>("wait");
  const [{ role }] = useContext(auth);

  useEffect(() => {
    if (fileList.length >= 2) setStatus("ready");
    else setStatus("wait");
  }, [fileList]);

  const UploadFiles = () => {
    if (role === Role.ADMIN) {
      const formData = new FormData();

      fileList.forEach((file) => formData.append("file", file as RcFile));

      setStatus("uploading");

      const asyncSendForm = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/files?MES=${month}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setFileList([]);
          toast.success(res.data.message);
          const r = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/valid/?MES=${month}`
          );
          toast.success(r.data.message);
        } catch (error: any) {
          toast.error(error.response.data.message);
          console.log(error.response.data.data);
        }
      };

      asyncSendForm();
      /* toast.promise(asyncSendForm, {
        pending: "Subiendo archivos...",
        success: "Archivos subidos con exito",
        error: "No se pudieron subir los archivos",
      }); */

      setStatus("ready");
    } else {
      toast.error("No tienes permisos para subir archivos");
    }
  };

  const onRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const onChange = (e: UploadChangeParam) => {
    const newArrayFiles = e.fileList.map((file) =>
      file.originFileObj ? file.originFileObj : file
    );
    setFileList(newArrayFiles);
  };

  const beforeUpload = (file: RcFile) => {
    setFileList([...fileList, file]);
    return false;
  };

  const uploadProps: UploadProps = {
    multiple: true,
    onRemove,
    beforeUpload,
    onChange,
    fileList,
  };

  return [status, UploadFiles, { uploadProps }];
};

export default useUploadFiles;
