import { FaWhatsapp } from "react-icons/fa";

const ChatBox = () => {
  return (
    <div>
      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+94765599810" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 cursor-pointer bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default ChatBox;
