import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { SmilePlus } from "lucide-react";

const EmojisPicker = () => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setOpenEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setEmoji(emoji.emoji);
    setOpenEmojiPicker(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setOpenEmojiPicker((prev) => !prev)}
      >
        <div className="text-lg">{emoji || <SmilePlus />}</div>
      </Button>
      {openEmojiPicker && (
        <div ref={pickerRef} className="absolute z-20">
          <EmojiPicker
            height={400}
            width={300}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
    </div>
  );
};

export default EmojisPicker;
