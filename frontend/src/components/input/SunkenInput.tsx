import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

interface SunkenInputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  onFinish: (value: string) => void;
  fieldRef?: React.RefObject<HTMLInputElement>;
}

export const SunkenInput = (props: SunkenInputProps) => {
  const [value, setValue] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Handle the form submission.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.onFinish(value);
  };

  return (
    <div>
      {props.label && (
        <p className="text-poker-foreground-light text-[20px] mb-2">
          {props.label}
        </p>
      )}
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="relative flex justify-center items-center">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);

              if (props.onChange) {
                props.onChange(e);
              }
            }}
            ref={props.fieldRef}
            className="w-72 border-none outline-none rounded-lg flex py-[14px] pl-5 pr-[50px] items-center justify-center bg-poker-gray text-poker-foreground-light shadow-poker-input text-[20px]"
          />
          <FontAwesomeIcon
            className="absolute right-0 mr-4 h-5 w-5 cursor-pointer text-poker-foreground-light hover:h-7 hover:w-7 transition-all ease-sunken-input-arrow"
            icon={faArrowRight}
            onClick={() => formRef.current?.requestSubmit()}
          />
        </div>
      </form>
    </div>
  );
};
