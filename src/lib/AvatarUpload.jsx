import {  useRef, useState } from 'react';
import { FiCamera } from 'react-icons/fi';

const AvatarUpload = ({ setAvatarFile,existingFileUrl}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); // Pass file to parent
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const avatarToShow = previewUrl || existingFileUrl;

  return (
    <div className="relative w-fit mx-auto mb-4">
      {/* Avatar Preview */}
      <img
        src={
          avatarToShow ||
          'https://cdn-icons-png.flaticon.com/512/847/847969.png'
        }
        alt="avatar"
        onClick={triggerFileInput}
        className={`w-[120px] h-[120px] rounded-full object-cover border-2 border-gray-300 cursor-pointer`}
      />

      {/* Camera Icon */}
      <div
        onClick={triggerFileInput}
        className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
      >
        <FiCamera size={16} className="text-gray-700" />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
