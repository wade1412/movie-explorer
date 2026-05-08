import { Box, Slider, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { sliderSx } from "./discoverStyles";

function ValueSlider({
  labelText,
  minValue,
  maxValue,
  step,
  valueRange,
  updateValueRange,
}) {
  // Local State
  const [localValue, setLocalValue] = useState([
    Number(valueRange[0]) || minValue,
    Number(valueRange[1]) || maxValue,
  ]);

  const handleChange = useCallback(
    (_, newValue) => {
      updateValueRange(newValue);
      setLocalValue(newValue);
    },
    [updateValueRange],
  );

  return (
    <div className="bg-dark-blue-800/50 flex w-full min-w-50 justify-center gap-4 rounded-2xl border border-dark-blue-600 px-6 md:w-auto">
      <div className="flex w-fit items-center justify-center">
        <label className="tracking-wider text-white">{labelText}</label>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Slider
          getAriaLabel={() => labelText}
          value={localValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={minValue}
          max={maxValue}
          step={step}
          disableSwap
          sx={sliderSx}
        />
      </Box>
    </div>
  );
}

export default ValueSlider;
