import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";

const ConfirmDeleteDialog = ({ onConfirm ,creator}) => {
  const dispatch = useDispatch();
  const { isDeleteMenu } = useSelector((state) => state.misc);

  const handleClose = () => {
    dispatch(setIsDeleteMenu(false));
  };

  if (!isDeleteMenu) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#0f1117] text-white rounded-lg p-6 relative w-full max-w-sm shadow-xl">
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={handleClose}
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4">{creator ? "Delete Chat":"Leave Group"}</h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to {creator ?"delete":"leave"} this chat? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            {creator ?"Delete":"Leave"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteDialog;
