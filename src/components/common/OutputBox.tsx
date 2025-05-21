import { TailoringResult } from '@/types';

interface OutputBoxProps {
  result: TailoringResult;
  onCopy?: () => void;
  onEdit?: () => void;
  onNext?: () => void;
}

export default function OutputBox({ result, onCopy, onEdit, onNext }: OutputBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">AI-Generated Summary</h3>
        <p className="text-gray-700">{result.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Key Points</h3>
        <ul className="list-disc list-inside space-y-2">
          {result.bulletPoints.map((point, index) => (
            <li key={index} className="text-gray-700">{point}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        {onCopy && (
          <button onClick={onCopy} className="btn-secondary">
            Copy
          </button>
        )}
        {onEdit && (
          <button onClick={onEdit} className="btn-secondary">
            Edit
          </button>
        )}
        {onNext && (
          <button onClick={onNext} className="btn-primary">
            Next
          </button>
        )}
      </div>
    </div>
  );
} 