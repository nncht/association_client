import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

const SelectCategories = ({ categoryArray, setCategoryArray }) => {
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_URL}/categories`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			})

			.then((res) => {
				console.log([...res.data.categories]);
				const categories = [...res.data.categories];
				const categoriesArray = categories.map((category) => {
					return category.category;
				});

				setAllCategories(categoriesArray);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleSelectChange = (e) => {
		console.log(e.target.value);
		setCategoryArray(e.target.value);
	};

	return (
		<Select


			name="categoryArray"
			id='categoryArray'
			multiple
			value={categoryArray}
			onChange={handleSelectChange}
			input={<OutlinedInput label='Tag' />}
			renderValue={(selected) => selected.join(', ')}
			MenuProps={MenuProps}
		>
			{allCategories.map((cat) => (
				<MenuItem key={cat} value={cat}>
					<Checkbox checked={categoryArray.indexOf(cat) > -1} onChange={handleSelectChange} />
					<ListItemText primary={cat} />
				</MenuItem>
			))}
		</Select>
	);
};

export default SelectCategories;
