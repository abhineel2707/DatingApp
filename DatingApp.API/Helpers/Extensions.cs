using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
        public static int GetCurrentAge(this DateTime datetime)
        {
            var currentDate = DateTime.Today;
            int age = currentDate.Year - datetime.Year;
            if (currentDate < datetime.AddYears(age))
            {
                age--;
            }
            return age;
        }
    }
}