FROM mcr.microsoft.com/dotnet/core/sdk AS build-env

WORKDIR /dashboard-api

COPY . ./

EXPOSE 5001

CMD ["dotnet", "watch", "run", "--urls", "https://0.0.0.0:5001"]


