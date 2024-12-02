import React from "react";
import { ITask } from "../../../types";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { onOpen } from "../tasksSlice";
import { deleteTask, fetchTasks, getOneTask } from "../tasksThunk";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  task: ITask;
}

const TasksItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { deleteLoading, fetchOneLoading } = useAppSelector(
    (state) => state.tasksStore,
  );

  const onDelete = async () => {
    if (window.confirm("Delete this task ?")) {
      await dispatch(deleteTask(task._id));
      await dispatch(fetchTasks());
    }
  };

  const onEdit = async (id: string) => {
    try {
      const task = await dispatch(getOneTask(id));
      if (task) {
        dispatch(onOpen());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card sx={{ minWidth: 300, maxWidth: "30%", marginBottom: "20px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <LoadingButton
            size="small"
            onClick={onDelete}
            disabled={deleteLoading.length > 0}
            loading={deleteLoading ? deleteLoading === task._id : false}
          >
            delete
          </LoadingButton>

          <LoadingButton
            type="submit"
            variant="outlined"
            disabled={fetchOneLoading.length > 0}
            loading={fetchOneLoading ? fetchOneLoading === task._id : false}
            loadingPosition="end"
            endIcon={<EditIcon />}
            size="small"
            color="success"
            onClick={() => onEdit(task._id)}
          >
            edit
          </LoadingButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default TasksItem;
