export default function ProgressIndicator({ progress }) {
  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="h-3 bg-neutral-900 w-full">
        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
  