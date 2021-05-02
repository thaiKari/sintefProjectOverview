import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Typography} from '@material-ui/core/'
import React from 'react';
import { Data } from './data/data';


const useStyles = makeStyles({
    root: {
      minWidth: 300,
      position: 'absolute',
      right: 10,
      top:10,
      zIndex:1000
    },
  });

  interface Props {
      data: Data | null
  }

export const InfoBox:React.FC<Props> = ({data}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardContent>
          {data && <Typography variant="h5" component="h2">
            {data.Name }
          </Typography>}
          <Typography color="textSecondary">
            {data ? `${data.Assignments} Assignments`: 'hover over country to see values'}
          </Typography>
        </CardContent>
      </Card>
    )
}
