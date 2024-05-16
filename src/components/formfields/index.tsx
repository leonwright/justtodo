"use client";
import {useRouter} from "next/navigation";

export const InputField = ({ id, name, placeholder, required, className, value }: { id: string, name: string, placeholder: string, required: boolean, className: string, value?: string }) => {
  return (
    <input type='text' id={id} name={name} placeholder={placeholder} required={required} className={className} defaultValue={value} />
  );
};

export const TextAreaField = ({ id, name, placeholder, required, className, value }: { id: string, name: string, placeholder: string, required: boolean, className: string, value?: string }) => {
  return (
    <textarea id={id} name={name} placeholder={placeholder} required={required} className={className} defaultValue={value} />
  );
};

export const CheckboxField = ({ id, name, className, checked }: { id: string, name: string, className: string, checked?: boolean }) => {
  return (
    <input type='checkbox' id={id} name={name} className={className} defaultChecked={checked} />
  );
};


export const EditButton = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/edit/${postId}`);
  };

  return (
    <button
      className="bg-blue-500 text-white rounded-md p-2 mt-4"
      onClick={handleClick}
    >
      Edit
    </button>
  );
};