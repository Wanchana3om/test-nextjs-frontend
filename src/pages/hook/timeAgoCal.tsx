export default function timeAgoCal(timestamp: any) {
  const currentDate = new Date();
  const createdAtDate = new Date(timestamp);
  const seconds = Math.floor(
    (currentDate.getTime() - createdAtDate.getTime()) / 1000
  );

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "mo.", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);

    if (count > 0) {
      return `${count}${interval.label} ago`;
    }
  }

  return "just now";
}
