import React from 'react'
import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
export default function UserCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
          </Avatar>
        }
        title={props.userName}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
            {props.email}
        </Typography>

      </CardContent>
    </Card>
  )
}
