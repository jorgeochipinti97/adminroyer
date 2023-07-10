
import React, { useRef, useState } from 'react';
import {
    Button, Switch, TextField, FormControlLabel, FormControl, InputLabel
    , Select, FormLabel, Box, Chip,
    MenuItem
} from '@mui/material';
import { useRouter } from 'next/router';

import {
    DriveFileRenameOutline,
    SaveOutlined,
    UploadOutlined,
} from "@mui/icons-material";
import axios from 'axios';

export default function ProductSlugPage() {
    const [isPopular, setIsPopular] = useState(false);

    const { asPath } = useRouter()
    const validGenders = ['hombre', 'mujer', 'accesorios', 'suplementos', 'equipamientos']
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const fileInputRef = useRef(null);
    const [newTagValue, setNewTagValue] = useState("");

    const typeOptionsByGender = {
        hombre: ['remera oversize', 'remera deportiva', 'musculosa', 'short', 'pantalón', 'medias', 'buzo'],
        mujer: ['remera oversize', 'remera deportiva', 'musculosa', 'short', 'pantalón', 'medias', 'buzo'],
        accesorios: ['proteina', 'creatina', 'quemadores', 'vitaminas'],
        suplementos: ['mancuernas', ',maquinas', 'home',],
        equipamientos: ['gorros', 'straps', 'cinturones', 'guantes', 'botellas', 'shakers', 'bolsos']
    };

    const typeOptions = typeOptionsByGender[selectedGender] || [];

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setFormData({
            ...formData, type: event.target.value
        })
    };

    const onNewTag = () => {
        try {
            const newTag = newTagValue.trim().toLocaleLowerCase();
            setNewTagValue("");
            const currentTags = formData.tags;

            if (currentTags.includes(newTag)) {
                return;
            }

            currentTags.push(newTag);
        } catch (err) {
            alert(err);
        }
    };


    const onDeleteTag = (tag) => {
        try {
            const updatedTags = formData.tags.filter((t) => t !== tag);
            setFormData({
                ...formData, tags: updatedTags
            })
        } catch (err) {
            alert(err);
        }
    };


    const getNewSlug = (title) => {
        try {
            const newSlug = title.trim()
                .replaceAll(" ", "_")
                .replaceAll("'", "")
                .toLocaleLowerCase() || "";
            setFormData({ ...formData, slug: newSlug })

        } catch (err) {
            alert(err);
        }
    }

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
        setFormData({
            ...formData, gender: event.target.value
        })
    };



    const validSizes = [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "XXXL",

        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "12.5",
        "13",
        "14",
        "15",
    ];
    const [formData, setFormData] = useState({
        description: '',
        personalization: '',
        price: 0,
        slug: '',
        tags: [],
        title: '',
        type: selectedType,
        talles: {
            'S': { stock: 0 },
            'M': { stock: 0 },
            'L': { stock: 0 },
            'XL': { stock: 0 },
            "7.5": { stock: 0 },
            "8": { stock: 0 },
            "8.5": { stock: 0 },
            "9": { stock: 0 },
            "9.5": { stock: 0 },
            "10": { stock: 0 },
            "10.5": { stock: 0 },
            "11": { stock: 0 },
            "11.5": { stock: 0 },
            "12": { stock: 0 },
            "12.5": { stock: 0 },
            "13": { stock: 0 },
            "14": { stock: 0 },
            "15": { stock: 0 }
        }, gender: selectedGender,
        popular: isPopular,
    });

    const handlePopularChange = (event) => {
        setIsPopular(event.target.checked);
        setFormData({
            ...formData, popular: event.target.checked
        })
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
        console.log(formData)
    };

    const onFilesSelected = async ({ target }) => {
        if (!target.files || target.files.length === 0) {
            return;
        }

        try {
            for (const file of target.files) {
                const formData_ = new FormData();
                formData_.append("file", file);
                const { data } =  axios.post(
                    "/api/upload",
                    formData_
                );
                const newImages = [data.message]
                setFormData({ ...formData, images: newImages.concat(formData.images) })
                console.log(data)

            }
        } catch (error) {
            console.log({ error });
        }
    };
    const handleTalleChange = (e) => {
        const { name, value } = e.target;
        const [tallesName, size, stockName] = name.split('_');

        setFormData((formData) => {
            const updatedTalles = {
                ...formData.talles,
                [size]: {
                    ...formData.talles[size],
                    [stockName]: parseInt(value)
                }
            };
            return {
                ...formData,
                talles: updatedTalles
            };
        });

        console.log(size)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getNewSlug(formData.title)
        console.log(formData)
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center' }}>
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={(e) => {
                        handleChange(e)

                    }}
                    required
                />

                <TextField
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="price"
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="tags"
                    label="Tags"
                    value={newTagValue}
                    onChange={({ target }) => setNewTagValue(target.value)}
                    onKeyUp={({ code }) =>
                        code === "Space" ? onNewTag() : undefined
                    }

                />

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        listStyle: "none",
                        p: 0,
                        m: 0,
                    }}
                    component="ul"
                >
                    {formData.tags && formData.tags.map((tag) => {
                        return (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => onDeleteTag(tag)}
                                color="primary"
                                size="small"
                                sx={{ ml: 1, mt: 1 }}
                            />
                        );
                    })}
                </Box>



                {validSizes.map((size) => (
                    <FormControlLabel
                        key={size}
                        control={
                            <TextField
                                name={`talles_${size}_stock`}
                                label={`Stock (${size})`}
                                type="number"

                                onChange={handleTalleChange}
                            />}
                        label={size}



                    />
                ))}

                <FormControl>
                    <InputLabel id="gender-label">Género</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        value={selectedGender}
                        onChange={handleGenderChange}
                    >
                        {validGenders.map((gender) => (
                            <MenuItem key={gender} value={gender}>
                                {gender}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <FormControl>
                    <InputLabel id="type-label">Tipo</InputLabel>
                    <Select
                        labelId="type-label"
                        id="type-select"
                        value={selectedType}
                        onChange={handleTypeChange}
                        disabled={!selectedGender}
                    >
                        {typeOptions.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>



                </FormControl>

                <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                <Button
                    color="secondary"
                    fullWidth
                    startIcon={<UploadOutlined />}
                    sx={{ mb: 3 }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Cargar imagen
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png, image/gif, image/jpeg"
                    style={{ display: "none" }}
                    onChange={onFilesSelected}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={isPopular}
                            onChange={handlePopularChange}
                            color="primary"
                        />
                    }
                    label="Popular"
                />

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </>
    )
}

