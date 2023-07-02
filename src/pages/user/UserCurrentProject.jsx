import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UserCurrentProject(){
    const { teamId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [projectId, setProjectId] = useState('');
    const [name, setName] = useState('');

    
    

}