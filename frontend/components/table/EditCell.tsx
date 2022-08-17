import { Button, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { AutoComplete, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { auxiliaryData } from "../../ts/interfaces/siigo/auxiliary.interfaces";

interface EditableCellProps {
  editable: boolean;
  children: React.ReactNode;
  record: auxiliaryData;
  handleSave: (record: auxiliaryData) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editable,
  children,
  record,
  handleSave,
  ...restProps
}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const inputRef = useRef<any>(null);
  const editInputRef = useRef<any>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = record.ASOCIADO.filter((tag) => tag !== removedTag);
    handleSave({ ...record, ASOCIADO: [...newTags] });
  };

  const handleInputChange = (data: string) => {
    setInputValue(data);
  };

  const handleInputConfirm = () => {
    if (inputValue && record.ASOCIADO.indexOf(inputValue) === -1) {
      handleSave({ ...record, ASOCIADO: [...record.ASOCIADO, inputValue] });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (data: string) => {
    setEditInputValue(data);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...record.ASOCIADO];
    newTags[editInputIndex] = editInputValue;
    handleSave({ ...record, ASOCIADO: [...newTags] });
    setEditInputIndex(-1);
    setInputValue("");
  };

  let childNode = children;

  const options = [
    { value: "tarjeta", label: "Tarjetas" },
    { value: "gasto", label: "Gasto Bank" },
    { value: "credito", label: "Credito" },
    { value: "debitos", label: "Debito" },
  ];

  if (editable) {
    childNode = (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {record.ASOCIADO.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Space>
                  <AutoComplete
                    ref={editInputRef}
                    key={tag}
                    style={{ width: 100 }}
                    options={options}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onSelect={handleEditInputChange}
                  />
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={handleEditInputConfirm}
                  />
                </Space>
              );
            }

            const tagElem = (
              <Tag
                className="edit-tag"
                key={tag}
                closable={true}
                onClose={() => handleClose(tag)}
              >
                <span
                  style={{ userSelect: "none" }}
                  onClick={(e) => {
                    if (index + 1) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {tag}
                </span>
              </Tag>
            );

            return tagElem;
          })}
          {inputVisible && (
            <Space>
              <AutoComplete
                ref={inputRef}
                style={{ width: 100 }}
                options={options}
                value={inputValue}
                onChange={handleInputChange}
                onSelect={handleInputChange}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CheckOutlined />}
                onClick={handleInputConfirm}
              />
            </Space>
          )}
          {!inputVisible && (
            <Tag
              className="site-tag-plus"
              onClick={() => setInputVisible(true)}
            >
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </Space>
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
export default EditableCell;
