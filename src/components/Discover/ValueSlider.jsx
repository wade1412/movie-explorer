import { Box, Slider, Typography } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import { sliderSx } from "./discoverStyles";

function ValueSlider({
  labelText,
  minValue,
  maxValue,
  step,
  valueRange,
  updateValueRange,
}) {
  // Local state
  const [localValue, setLocalValue] = useState([
    Number(valueRange[0]) || minValue,
    Number(valueRange[1]) || maxValue,
  ]);

  // Debounce
  const debouncedValue = useDebounce(localValue);

  // Update range in params when debounced value changes
  useEffect(() => {
    updateValueRange(debouncedValue);
  }, [debouncedValue, updateValueRange]);

  const handleChange = useCallback((_, newValue) => {
    setLocalValue(newValue);
  }, []);

  return (
    <div className="bg-dark-blue-800/50 flex w-full min-w-50 justify-center gap-4 rounded-2xl border border-dark-blue-600 px-6 md:w-auto">
      <div className="flex w-fit items-center justify-center">
        <label className="text-lg tracking-wider text-white">{labelText}</label>
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
