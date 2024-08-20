import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { SmilePlus } from "lucide-react";

interface emojiProps {
  value?: (v: string) => void;
  forDocument?: boolean;
  emojiDatabase?: string | void | undefined;
  getEmoji?: (getEmoji: string) => void;
}

const EmojisPicker = ({
  value,
  forDocument,
  emojiDatabase,
  getEmoji,
}: emojiProps) => {
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
    value && value(emoji.emoji);
    getEmoji && getEmoji(emoji.emoji);
    setOpenEmojiPicker(false);
  };

  return (
    <div>
      {forDocument ? (
        <div onClick={() => setOpenEmojiPicker((prev) => !prev)}>
          <div className="text-4xl">
            {emojiDatabase
              ? emojiDatabase
              : emoji || (
                  <SmilePlus
                    className=" transition-transform animate-pulse"
                    color="#151517"
                    size={40}
                  />
                )}
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpenEmojiPicker((prev) => !prev)}
        >
          <div className="text-lg">{emoji || <SmilePlus />}</div>
        </Button>
      )}

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
