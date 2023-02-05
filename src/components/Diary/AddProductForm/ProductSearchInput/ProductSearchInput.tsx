import { Autocomplete, debounce, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchProductQuery } from '../../../../redux/diet/dietApi';

interface IProps {
  setProdId: Function;
  error: boolean;
  setProductSearchError: Function;
}

const ProductSearchInput: React.FC<IProps> = ({ setProdId, error, setProductSearchError }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'diary' });
  const [query, setQuery] = useState('');
  const { data: productsList, isFetching } = useSearchProductQuery(query, {
    skip: !query,
  });

  let optionList = productsList
    ? productsList?.map(product => product?.title?.ua || 'Server Error. Try later.')
    : [];
  const handleChangeQuery = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setProductSearchError(false);
    const { target } = e;
    setQuery(target.value);
  };
  const debouncedHandleChangeQuery = debounce(handleChangeQuery, 300);
  const handleChange = (value: string | null) => {
    if (value && productsList) {
      const selectedProduct = productsList.find(product => product.title.ua === value);
      setProdId(selectedProduct?._id);
    } else {
      setProdId('');
      optionList = [];
    }
  };
  return (
    <FormControl sx={{ width: { xs: '100%' } }}>
      <Autocomplete
        options={optionList}
        clearOnBlur={false}
        fullWidth
        loading={isFetching}
        loadingText={t('loadingText') ?? 'Loading products...'}
        noOptionsText={t('noOptionsText') ?? 'No products...'}
        onChange={(_, value) => {
          handleChange(value);
        }}
        renderInput={params => (
          <TextField
            {...params}
            error={error}
            fullWidth
            onChange={debouncedHandleChangeQuery}
            label={t('enterProduct') ?? 'Enter product name'}
          />
        )}
      />
      <FormHelperText sx={{ position: { sm: 'absolute' }, bottom: -22, left: -14 }} error={error}>
        {error ? t('chooseProduct') ?? 'Choose product from the list' : ' '}
      </FormHelperText>
    </FormControl>
  );
};

export default ProductSearchInput;
