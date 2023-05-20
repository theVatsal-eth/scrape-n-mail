import { ScrapeData } from './scrapeHelper';

export const getEmailTemplate = (data: ScrapeData[]) => {
  const lastDate: string = data[0].date;

  const tableRow = data.map(
    ({ date, href, news }) =>
      `<tr>
        <td>${date}</td>
        <td>${news}</td>
        <td><a class="btn" href="${href}" target="_blank">View Details</a></td>
    </tr>`
  );

  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GNSCR Notice</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f4e3;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #e78c0e;
            margin-bottom: 20px;
        }

        p {
            margin-bottom: 20px;
            color: #555;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #fdf5e6;
            color: #e78c0e;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f39c12;
            color: #000;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #e67e22;
        }

        .socials {
            margin-top: 30px;
            text-align: center;
        }

        .socials h2 {
            font-size: 18px;
            margin-bottom: 10px;
            color: #000;
        }

        .socials ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            display: inline-block;
        }

        .socials li {
            display: inline-block;
            margin-right: 10px;
        }

        .socials a {
            display: inline-block;
            color: #e78c0e;
            text-decoration: none;
        }

        .thank-you {
            margin-top: 30px;
            font-size: 14px;
            color: #555;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>GNSCR Notice</h1>

        <p>This is an automated email generated from <a href="https://gnscr.vercel.app" target="_blank">https://gnscr.vercel.app</a>, an unofficial college update platform. It is created as a personal project by <a href="https://vatsal.dev" target="_blank">Vatsal Awadhiya</a>.</p>
	<p> Stay informed with the latest news and updates since ${lastDate}:</p>


        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>News</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <!-- Add table rows dynamically here -->
                ${tableRow.join('')}
            </tbody>
        </table>

        <div class="thank-you">
            <p>Thank you for your attention and support!</p>
        </div>

        <div class="socials">
            <h2>My socials:</h2>
            <ul>
                <li><a href="https://twitter.com/thevatsal_eth" target="_blank">Twitter</a></li>
                <li><a href="https://github.com/thevatsal-eth" target="_blank">Github</a></li>
                <li><a href="https://thevatsal.dev" target="_blank">Website</a></li>
            </ul>
        </div>

    </div>
</body>

</html>
`;
};
