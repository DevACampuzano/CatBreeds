import { useState } from "react";

const stateToFocuses = <T extends object>(
  state: T
): Record<string, boolean> => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};

export const useForm = <T extends object, V extends object>(
  initState: T,
  validator?: V
) => {
  const inititialFocuses = stateToFocuses(initState);
  const [state, setState] = useState<T>(initState);
  const [focuses, setFocuses] = useState(inititialFocuses);

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const onChange = (
    Tvalue: string | number | boolean,
    key: keyof T,
    file: boolean = false
  ): Promise<string> => {
    return new Promise((resolve) => {
      (async () => {
        if (!file) {
          setState({
            ...state,
            [key]: Tvalue,
          });
          return resolve("Cambios guardados con Exito!");
        }
      })();
    });
  };

  const setForm = (form: T) => {
    setState({
      ...form,
    });
  };

  const resetForm = () => {
    setForm(initState);
  };

  const isValidRegExpObject = (obj: V): obj is V & Record<string, RegExp> => {
    if (typeof obj !== "object" || obj === null) return false;

    for (const key in obj) {
      const value = obj[key];
      if (
        value &&
        typeof value === "object" &&
        value.constructor.name === "RegExp"
      ) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  };

  const validateFieldsText = (key: keyof V, value: keyof T) => {
    if (!validator) {
      throw new Error("To use this feature you need the validators.");
    }
    const v = validator[key] as RegExp;
    return !v.test(state[value] as string);
  };

  const onChangeFocus = (key?: keyof T) => {
    const f = { ...focuses };
    for (const keys in state) {
      if (keys === key) {
        f[keys] = true;
      } else {
        f[keys] = false;
      }
    }

    setFocuses(f);
  };

  if (validator && !isValidRegExpObject(validator)) {
    throw new Error("All validator fields must be of RegEx type.");
  }

  return {
    ...state,
    form: state,
    focuses,
    onChange,
    setForm,
    resetForm,
    getBase64,
    validateFieldsText,
    onChangeFocus,
  };
};

export default useForm;
