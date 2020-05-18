<!DOCTYPE html>
<html>
    <head>
        <title></title>
    </head>
    <body>
        <ul>
            @foreach($users as $user)
                <li>{{$user->firstName}} {{$user->lastName}}</li>
                @endforeach
        </ul>
    </body>
</html>
