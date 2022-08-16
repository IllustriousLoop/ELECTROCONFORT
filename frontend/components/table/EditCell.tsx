import { InputRef, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";
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
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && record.ASOCIADO.indexOf(inputValue) === -1) {
      handleSave({ ...record, ASOCIADO: [...record.ASOCIADO, inputValue] });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...record.ASOCIADO];
    newTags[editInputIndex] = editInputValue;
    handleSave({ ...record, ASOCIADO: [...newTags] });
    setEditInputIndex(-1);
    setInputValue("");
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {record.ASOCIADO.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  className="tag-input"
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
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
            <Input
              ref={inputRef}
              type="text"
              size="small"
              className="tag-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
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
