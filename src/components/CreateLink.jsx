import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";
import {BeatLoader} from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "./Error"
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "../hooks/useFetch";
import { createUrl } from "../db/apiUrls";
function CreateLink() {
    const { user } = UrlState()
    const navigate = useNavigate()
    const ref = useRef()

    let [searchParams, setSearchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")

    //state management for form
    const [errors, setErrors] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    //validating
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    //calling api and passing the values
    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues, user_id: user.id });

    //making error dynamic and navigating if not error occurs
    useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

    //create new link func - btn
    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });

            //qr code canvas
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl({ ...formValues, user_id: user.id }, blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };



    return (
        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }} >
            <DialogTrigger>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New Link</DialogTitle>
                </DialogHeader>

                {/* QR CODE GENERATION FOR THE ENTERED LONG LINK */}
                {formValues?.longUrl && (
                    <QRCode ref={ref} size={200} value={formValues?.longUrl} />
                )}

                <Input id="title" placeholder="Short Link's Title" value={formValues.title}
                    onChange={handleChange} />
                {errors.title && <Error message={"some error"} />}
                <Input id="longUrl" placeholder="Enter Long URL (e.g, https://abc.com)" value={formValues.longUrl}
                    onChange={handleChange} />
                {errors.longUrl && <Error message={"some error"} />}
                <div className="flex items-center gap-2">
                    <Card className="p-2">trimrr.link</Card> /
                    <Input id="customUrl" placeholder="Custom Link (optional)" value={formValues.customUrl}
                        onChange={handleChange} />
                </div>
                {error && <Error message={"some error"} />}
                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={createNewLink}
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLink
