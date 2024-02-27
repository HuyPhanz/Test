import "./index.scss";
import {
  Modal,
  Upload,
  UploadProps,
  ModalProps,
  Button,
  notification,
} from "antd";
import {useTranslation} from "react-i18next";
import ApiStore from "@app/api/ApiStore";
import {useState} from "react";
import {PaperClipOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {handleExportCategory} from "@app/api/ApiCategories";

interface IUploadFileProps extends ModalProps {
  onSuccess?: () => void;
}

const {Dragger} = Upload;

export default function UploadFileModal(props: IUploadFileProps): JSX.Element {
  const {t} = useTranslation();

  const [uploadedFiles, setUploadedFiles] = useState<RcFile[]>([]);
  const [loading, setLoading] = useState(false);

  function handleOk(): void {
    if (uploadedFiles.length > 0) {
      if (!loading) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", uploadedFiles[0]);
        ApiStore.handleImport(formData)
          .then((res) => {
            notification.success({
              message: res?.message ?? "File uploaded successfully!",
            });
            if (props.onSuccess) {
              props.onSuccess();
            }
            setLoading(false);
            setUploadedFiles([]);
          })
          .catch(() => {
            // message.error(`${uploadedFiles[0]?.name} file upload failed.`);
            setLoading(false);
          });
      }
    } else {
      notification.error({message: "Empty file!"});
    }
  }

  const uploadProps: UploadProps = {
    name: "file",
    beforeUpload: (file) => {
      setUploadedFiles([file]);
      return false;
    },
    accept: ".xls, .xlsm, .csv, .xlsx",
    showUploadList: false,
  };

  const onCancel: ModalProps["onCancel"] = (e) => {
    setUploadedFiles([]);
    if (props.onCancel) {
      props.onCancel(e);
    }
  };

  return (
    <Modal
      {...props}
      className="upload-excel-modal"
      onOk={() => handleOk()}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Dragger className="dragger" {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <svg
            className="inline-block"
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.4939 21.4112L41.4845 21.3737L36.2252 8.00962C35.9908 7.25493 35.2923 6.73462 34.5002 6.73462H13.1814C12.3845 6.73462 11.6767 7.26431 11.4517 8.02837L6.53453 21.2565L6.52047 21.2893L6.51109 21.3268C6.45016 21.5565 6.43141 21.7909 6.46422 22.0206C6.45953 22.0956 6.45484 22.1706 6.45484 22.2456V39.3971C6.45608 40.1526 6.75675 40.8768 7.29096 41.411C7.82517 41.9452 8.54936 42.2459 9.30484 42.2471H38.7048C40.2752 42.2471 41.5548 40.9674 41.5595 39.3971V22.2456C41.5595 22.1846 41.5595 22.1237 41.5548 22.0721C41.5736 21.8424 41.5548 21.6221 41.4939 21.4112ZM27.6283 19.3956L27.6142 20.1315C27.5767 22.2362 26.1236 23.6518 24.0002 23.6518C22.9642 23.6518 22.0736 23.319 21.4314 22.6862C20.7892 22.0534 20.4377 21.1721 20.4189 20.1315L20.4048 19.3956H10.758L14.4845 10.3346H33.197L37.0267 19.3956H27.6283ZM10.0502 22.9956H17.4236C18.5627 25.6721 20.9861 27.2518 24.0048 27.2518C25.5845 27.2518 27.0517 26.8112 28.2377 25.9768C29.2783 25.2456 30.0892 24.2237 30.6142 22.9956H37.9502V38.6471H10.0502V22.9956Z"
              fill="#A32E8C"
            />
          </svg>
        </p>
        {uploadedFiles.length > 0 ? (
          <div className="flex flex-col gap-1">
            {uploadedFiles.map((file, index) => (
              <p key={index}>{file.name}</p>
            ))}
          </div>
        ) : (
          <div>
            <p className="ant-upload-text">{t("modal.upload.title")}</p>
            <p className="ant-upload-hint">Support .xls .xlsm .csv .xlsx</p>
          </div>
        )}
      </Dragger>
      <Button
        type="link"
        icon={<PaperClipOutlined />}
        onClick={() => {
          ApiStore.handleExportExcel(true, "Download excel template");
        }}
      >
        Get template.xlsx
      </Button>
      <Button
        type="link"
        icon={<PaperClipOutlined />}
        onClick={() => {
          handleExportCategory(true, "Download excel categories");
        }}
      >
        Get categories excel.xlsx
      </Button>
    </Modal>
  );
}
