# Database Switching Configuration

This project supports automatic database switching between SQLite3 (development) and PostgreSQL (production) based on environment variables.

## How It Works

The system automatically detects your environment and switches databases accordingly:

- **Development Mode**: Uses SQLite3 (`db.sqlite3`)
- **Production Mode**: Uses PostgreSQL (Railway)

## Environment Variables

Create a `.env` file in the `backend/` directory:

### For Development (Default)
```bash
# .env file
ENVIRONMENT=development
```

**Result**: Automatically uses SQLite3 database

### For Production
```bash
# .env file
ENVIRONMENT=production
PG_DATABASE=railway
PG_USER=postgres
PG_PASSWORD=your_postgres_password
PG_HOST=your_postgres_host
PG_PORT=5432
```

**Result**: Uses PostgreSQL database

## Database Configuration

### Development (SQLite3)
- **Engine**: `django.db.backends.sqlite3`
- **Database**: `db.sqlite3` (automatically created in backend directory)
- **No additional setup required**

### Production (PostgreSQL)
- **Engine**: `django.db.backends.postgresql`
- **Database**: Set via `PG_DATABASE` environment variable
- **User**: Set via `PG_USER` environment variable
- **Password**: Set via `PG_PASSWORD` environment variable
- **Host**: Set via `PG_HOST` environment variable
- **Port**: Set via `PG_PORT` environment variable (defaults to 5432)

## Usage Examples

### Switch to Development Mode
```bash
# In your .env file
ENVIRONMENT=development

# Run Django
python manage.py runserver
# Will use SQLite3 automatically
```

### Switch to Production Mode
```bash
# In your .env file
ENVIRONMENT=production
PG_DATABASE=railway
PG_USER=postgres
PG_PASSWORD=your_password
PG_HOST=your_host
PG_PORT=5432

# Run Django
python manage.py runserver
# Will use PostgreSQL automatically
```

## Commands

### Development (SQLite3)
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Production (PostgreSQL)
```bash
# Ensure PostgreSQL is accessible
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

## Notes

- **Default**: If no `ENVIRONMENT` variable is set, it defaults to `development` (SQLite3)
- **Case Insensitive**: The environment variable is automatically converted to lowercase
- **Fallback**: If PostgreSQL environment variables are missing in production mode, Django will show connection errors
- **No Code Changes**: Switch databases by changing only the `.env` file

## Troubleshooting

### PostgreSQL Connection Issues
- Verify all PostgreSQL environment variables are set
- Check if PostgreSQL server is running and accessible
- Verify network connectivity to the database host

### SQLite3 Issues
- Ensure the backend directory is writable
- Check if `db.sqlite3` file can be created

### Environment Variable Issues
- Verify `.env` file is in the `backend/` directory
- Check that `python-dotenv` is installed
- Ensure no spaces around `=` in `.env` file
