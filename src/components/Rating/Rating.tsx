import React, { CSSProperties } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Rating.scss";

interface RatingProps {
  label?: string;
  value?: number;
  length?: number;
  onRate?: (value: number) => void;
  style?: CSSProperties;
}

const Rating: React.FC<RatingProps> = ({
  label = "",
  value = 0,
  length = 5,
  onRate = () => void 0,
  style,
}: RatingProps) => {
  const [rating, setRating] = useState<number>(value);

  useEffect(() => {
    onRate(rating);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <div className="rating" style={style && style}>
      <span className="rating__label">{label}</span>
      {value > 0 &&
        [...Array(value)].map((_: any, index: number) => {
          return (
            <img
              key={`filled-${index}`}
              className="rating__selected"
              src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAyMjYgMjI2Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyMjZ2LTIyNmgyMjZ2MjI2eiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0xMTMsOS40MTY2N2wtMjYuMDc5NzUsNzMuNDIwNTdsLTc3Ljg3MTQyLDIuMTE1MDdsNjEuNzQxNyw0Ny40ODc5NWwtMjIuMDMzNTMsNzQuNzI2NGw2NC4yNDMsLTQ0LjA2NzA2bDY0LjI0Myw0NC4wNjcwNmwtMjIuMDMzNTMsLTc0LjcyNjRsNjEuNzQxNjksLTQ3LjQ4Nzk1bC03Ny44NzE0MiwtMi4xMTUwN3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
              alt="Hellsio Rating Star"
              onClick={(): void => {
                setRating(index + 1);
              }}
            />
          );
        })}
      {[...Array(length - value)].map((_: any, index: number) => {
        return (
          <img
            key={`not-filled-${index}`}
            className="rating__unselected"
            src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAyMjYgMjI2Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyMjZ2LTIyNmgyMjZ2MjI2eiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNhZTBiMDAiPjxwYXRoIGQ9Ik0yMTYuOTYsODQuOTQ3NzVsLTc3Ljg3NTgzLC0yLjExODc1bC0yNi4wODQxNywtNzMuNDEyMzNsLTI2LjA4NDE3LDczLjQxMjMzbC03Ny44NzU4MywyLjExODc1bDYxLjc2MzkyLDQ3LjQ4ODI1bC0yMi4wNTM4Myw3NC43MzA2N2w2NC4yNDk5MiwtNDQuMDYwNThsNjQuMjQ5OTIsNDQuMDYwNThsLTIyLjA1MzgzLC03NC43MjEyNXpNMTEzLDE0MC4yNzA2N2wtMzEuMTg4LDIxLjM4NTI1bDEwLjcwNjc1LC0zNi4yNjM1OGwtMjkuOTczMjUsLTIzLjA1MmwzNy43OTg1LC0xLjAyNjQybDEyLjY1NiwtMzUuNjQyMDhsMTIuNjU2LDM1LjYzMjY3bDM3Ljc5ODUsMS4wMjY0MmwtMjkuOTczMjUsMjMuMDUybDEwLjcwNjc1LDM2LjI2MzU4eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            alt="Hellsio Rating Star"
            onClick={(): void => {
              setRating(value + index + 1);
            }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
