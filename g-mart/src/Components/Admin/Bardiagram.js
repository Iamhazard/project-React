import React from "react";

const BarDiagram = ({ data }) => {
  if (!data || !Array.isArray(data)) {
    return <div>No data available.</div>; // Or any other fallback UI
  }
  // Create an object to store the frequencies of each payment mode
  const paymentModeFrequencies = {};

  // Count the frequencies of each payment mode
  data.forEach((item) => {
    const paymentMode = item.payment_mode;
    if (paymentModeFrequencies[paymentMode]) {
      paymentModeFrequencies[paymentMode] += 1;
    } else {
      paymentModeFrequencies[paymentMode] = 1;
    }
  });

  // Get an array of unique payment modes
  const paymentModes = Object.keys(paymentModeFrequencies);

  // Find the maximum frequency to use as a scaling factor for the bar heights
  const maxFrequency = Math.max(...Object.values(paymentModeFrequencies));

  return (
    <div className="flex items-end">
      <table className="border-collapse border border-gray-300">
        <tbody>
          {paymentModes.map((paymentMode) => (
            <tr key={paymentMode}>
              <td className="border p-2">{paymentMode}</td>
              <td className="border p-2">
                <div
                  className="bg-blue-500 h-full"
                  style={{
                    width: "50px",
                    height: `${
                      (paymentModeFrequencies[paymentMode] / maxFrequency) * 100
                    }px`,
                  }}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BarDiagram;
