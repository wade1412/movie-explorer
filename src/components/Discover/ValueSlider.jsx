import { Box, Slider, Typography } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

const sliderSx = {
  color: "#3e4556",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#a1adbd",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#1e293b",
    opacity: 1,
    border: "1px solid #d1d9e6",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#ffffff",
    border: "1px solid #1e293b",
    "&:hover, &.Mui-active": {
      boxShadow: "0px 0px 0px 8px rgba(116, 138, 174, 0.16)",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#1a1f2b",
    color: "#fff",
    borderRadius: "6px",
    fontSize: "0.85rem",
    border: "1px solid #d1d9e6",
  },
};

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
    <div className="flex gap-6 items-center justify-center">
      <label className="text-lg text-white whitespace-nowrap">
        {labelText}
      </label>

      <Box sx={{ width: 125, paddingTop: "10px" }}>
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
