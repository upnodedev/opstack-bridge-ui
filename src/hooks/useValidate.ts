import {
  ParsedInputResult,
  parseInput,
} from '@ensdomains/ensjs/utils';

import { Prettify } from 'viem/chains';
import { tryBeautify } from '@utils/beautify';
import { useQueryKeys } from '@utils/cacheKeyFactory';
import { useQuery } from '@tanstack/react-query';

export type ValidationResult = Prettify<
  Partial<Omit<ParsedInputResult, 'normalised' | 'labelDataArray'>> & {
    name: string;
    beautifiedName: string;
    isNonASCII: boolean | undefined;
    labelCount: number;
    labelDataArray: ParsedInputResult['labelDataArray'];
  }
>;

const tryDecodeURIComponent = (input: string) => {
  try {
    return decodeURIComponent(input);
  } catch {
    return input;
  }
};

export const validate = (input: string) => {
  const decodedInput = tryDecodeURIComponent(input);
  const { normalised: name, ...parsedInput } = parseInput(decodedInput);
  const isNonASCII = parsedInput.labelDataArray.some(
    (dataItem) => dataItem.type !== 'ASCII'
  );
  const outputName = name || input;

  const isOp = outputName.endsWith('.op');

  return {
    ...parsedInput,
    isOp,
    name: outputName,
    beautifiedName: tryBeautify(outputName),
    isNonASCII,
    labelCount: parsedInput.labelDataArray.length,
  };
};

const defaultData = Object.freeze({
  name: '',
  beautifiedName: '',
  isNonASCII: undefined,
  labelCount: 0,
  type: undefined,
  isValid: undefined,
  isShort: undefined,
  is2LD: undefined,
  isETH: undefined,
  isOp: undefined,
  labelDataArray: [],
});

export const useValidate = (input: string, skip?: any): ValidationResult => {
  const { data } = useQuery(
    {
      queryKey: useQueryKeys().validate(input),
      enabled: !skip,
      initialData: () => (skip ? defaultData : validate(input)),
      queryFn: () => validate(input),},
  );

  return data;
};
