"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
  useUpdateRoomNotificationSettings,
} from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

function NotificationBox({ children }: { children: React.ReactNode }) {
  const { inboxNotifications } = useInboxNotifications();
  const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();
  const { count } = useUnreadInboxNotificationsCount();
  useEffect(() => {
    updateRoomNotificationSettings({ threads: "all" });
  }, [count, updateRoomNotificationSettings]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex gap-1">
          {children}
          {count ? (
            <div className="rounded-full bg-rose-500  h-[16px] w-[16px]  flex justify-center items-center ml-3 absolute">
              <span className=" text-white rounded-full text-xs bg-primary">
                {count}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={"w-[300px] sm:w-[400px] md-[500px]  bg-slate-100 rounded-lg"}
      >
        <InboxNotificationList>
          {inboxNotifications.map((inboxNotification, index) => (
            <InboxNotification
              key={index}
              showActions={false}
              inboxNotification={inboxNotification}
              kinds={{
                thread: (props) => (
                  <InboxNotification.Thread {...props} showRoomName={false} />
                ),
              }}
            />
          ))}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationBox;
