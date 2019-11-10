FROM mcr.microsoft.com/dotnet/core/sdk AS build-env

WORKDIR /dashboard-api

COPY . ./

EXPOSE 5000

CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5000"]


